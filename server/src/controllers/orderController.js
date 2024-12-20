import * as models from "../models/index.js";
import sequelize from "../configs/database.js";
import crypto from "crypto";

import { getSocket } from "../configs/socket.js";
import { Op } from "sequelize";

export default class OrderController {
    static payuCallback = async (req, res) => {
        const t = await sequelize.transaction();
        const extraInfo = { ...JSON.parse(req.query.extra1), ...JSON.parse(req.query.extra2) };

        try {
            const payuResponse = await fetch(process.env.EXPO_PUBLIC_PAYU_TRANSACTION_REQUEST_URI, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    test: process.env.EXPO_PUBLIC_PAYU_TEST_MODE == 1 ? true : false,
                    language: "en",
                    command: "ORDER_DETAIL_BY_REFERENCE_CODE",
                    merchant: {
                        apiLogin: process.env.EXPO_PUBLIC_PAYU_API_LOGIN,
                        apiKey: process.env.EXPO_PUBLIC_PAYU_API_KEY,
                    },
                    details: {
                        referenceCode: req.query.referenceCode,
                    },
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.code !== "SUCCESS") {
                        throw new Error(data.error || JSON.stringify(data));
                    }
                    return data.result.payload[0];
                });

            const transactionDetailedInfo =
                payuResponse.transactions[payuResponse.transactions.length - 1];

            if (transactionDetailedInfo.transactionResponse.state !== "APPROVED") {
                throw new Error("No se pudo realizar el pago");
            }

            const order = await models.Order.create({
                user_id: req.session.user.user_id,
            });

            const paymentDetails = await models.PaymentDetails.create({
                order_id: order.order_id,
                payment_method: transactionDetailedInfo.paymentMethod,
                payment_amount: transactionDetailedInfo.additionalValues.PM_PAYER_TOTAL_AMOUNT.value,
                buyer_name: transactionDetailedInfo.payer.fullName,
                buyer_email: transactionDetailedInfo.payer.emailAddress,
                buyer_document_type: transactionDetailedInfo.payer.dniType,
                buyer_document_number: transactionDetailedInfo.payer.dniNumber,
                buyer_phone: transactionDetailedInfo.extraParameters.PAYER_TELEPHONE,
                payu_reference: payuResponse.referenceCode,
            });

            const shippingDetails = await models.ShippingDetails.create({
                order_id: order.order_id,
                shipping_address: extraInfo.shippingAddress,
                shipping_coordinates: extraInfo.shippingCoordinates,
                shipping_cost: 7500,
                shipping_message: extraInfo.payerMessage,
            });

            const carts = await models.Cart.findAll({
                where: { user_id: req.session.user_id },
                include: [{ model: models.Product, as: "product" }],
            });

            const cartItems = carts.map((cart) => {
                return {
                    order_id: order.order_id,
                    product_id: cart.product_id,
                    product_quantity: cart.product_quantity,
                    product_price: cart.product.product_price,
                };
            });

            const orderProducts = await models.OrderProduct.bulkCreate(cartItems, {
                transaction: t,
            });

            const workerBalances = {};

            const orderProductPromises = orderProducts.map(async (orderProduct) => {
                const product = await models.Product.findByPk(orderProduct.product_id, {
                    include: [
                        {
                            model: models.User,
                            as: "user",
                            include: [{ model: models.Worker, as: "worker" }],
                        },
                    ],
                });

                // Update product quantity
                await models.Product.update(
                    {
                        product_quantity:
                            product.product_quantity - orderProduct.product_quantity,
                    },
                    {
                        where: { product_id: orderProduct.product_id },
                        transaction: t,
                    }
                );

                const userId = product.user_id;

                if (!workerBalances[userId]) {
                    workerBalances[userId] = parseInt(product.user.worker.worker_balance);
                }

                workerBalances[userId] +=
                    parseInt(orderProduct.product_price) *
                    parseInt(orderProduct.product_quantity);

                // Escribir el nuevo saldo en la base de datos
                await models.Worker.update(
                    {
                        worker_balance: workerBalances[userId],
                    },
                    {
                        where: { user_id: userId },
                        transaction: t,
                    }
                );
            });

            await Promise.all(orderProductPromises);

            const emptyCart = await models.Cart.destroy({
                where: { user_id: req.session.user_id },
                transaction: t,
            });

            await t.commit();

            const io = getSocket();

            const soldProducts = await Promise.all(
                cartItems.map((cartItem) => models.Product.findByPk(cartItem.product_id))
            );

            io.emit("sale", soldProducts);

            res.redirect(`${process.env.EXPO_PUBLIC_APP_DOMAIN}/order/${order.order_id}`);
        } catch (error) {
            await t.rollback();
            res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static updateOrder = async (req, res) => {
        const t = await sequelize.transaction();
        try {
            if (req.body.order) {
                await models.Order.update(req.body.order, {
                    where: { order_id: req.params.id },
                    transaction: t,
                });
            }

            if (req.body.shippingDetails) {
                await models.ShippingDetails.update(req.body.shippingDetails, {
                    where: { order_id: req.params.id },
                    transaction: t,
                });
            }

            if (req.body.delivery) {
                await models.Worker.update(req.body.delivery, {
                    where: { worker_id: req.body.delivery_id },
                    transaction: t,
                });
            }

            const io = getSocket();

            io.emit("updateSale", req.params.id);

            await t.commit();
            res.status(200).json({
                success: true,
                message: "Orden actualizada correctamente",
                data: null,
            });
        } catch (error) {
            await t.rollback();
            res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static getOrder = async (req, res) => {
        try {
            const order = await models.Order.findByPk(req.params.id, {
                include: [
                    {
                        model: models.OrderProduct,
                        as: "orderProducts",
                        include: {
                            model: models.Product,
                            as: "product",
                            include: { model: models.User, as: "user" },
                        },
                    },
                    {
                        model: models.ShippingDetails,
                        as: "shippingDetails",
                        include: {
                            model: models.Worker,
                            as: "worker",
                            include: { model: models.User, as: "user" },
                        },
                    },
                    { model: models.PaymentDetails, as: "paymentDetails" },
                    { model: models.User, as: "user" },
                ],
            });

            res.status(200).json({
                success: false,
                message: "Orden encontrada correctamente",
                data: order,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static getOrders = async (req, res) => {
        const whereClause = {};
        const whereOrderProductClause = {};
    
        if (req.query.order_status) whereClause.order_status = {
            [Op.in]: req.query.order_status.split(","),
        };
        if (req.query.user_id) whereOrderProductClause.user_id = req.query.user_id;

        try {
            const order = await models.Order.findAll({
                where: whereClause,
                include: [
                    { model: models.User, as: "user" },
                    {
                        model: models.OrderProduct,
                        as: "orderProducts",
                        required: true,
                        include: {
                            model: models.Product,
                            as: "product",
                            include: { model: models.User, as: "user" },
                            where: whereOrderProductClause,
                            required: true,
                        },
                    },
                    { model: models.ShippingDetails, as: "shippingDetails" },
                    { model: models.PaymentDetails, as: "paymentDetails" },
                ],
            });

            res.status(200).json({
                success: false,
                message: "Orden encontrada correctamente",
                data: order,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };
}
