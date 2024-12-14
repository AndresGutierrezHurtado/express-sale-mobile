import * as models from "../models/relations.js";
import sequelize from "../config/database.js";
import crypto from "crypto";

import { getSocket } from "../config/socket.js";
import { Op } from "sequelize";

export default class OrderController {
    static payuCallback = async (req, res) => {
        const t = await sequelize.transaction();
        const extraInfo = { ...JSON.parse(req.query.extra1), ...JSON.parse(req.query.extra2) };

        try {
            const payuResponse = await fetch(process.env.VITE_PAYU_TRANSACTION_REQUEST_URI, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    test: process.env.VITE_PAYU_TEST_MODE == 1 ? true : false,
                    language: "en",
                    command: "ORDER_DETAIL_BY_REFERENCE_CODE",
                    merchant: {
                        apiLogin: process.env.VITE_PAYU_API_LOGIN,
                        apiKey: process.env.VITE_PAYU_API_KEY,
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
                pedido_id: crypto.randomUUID(),
                usuario_id: req.session.user.usuario_id,
            });

            const paymentDetails = await models.PaymentDetails.create({
                pago_id: crypto.randomUUID(),
                pedido_id: order.pedido_id,
                pago_metodo: transactionDetailedInfo.paymentMethod,
                pago_valor: transactionDetailedInfo.additionalValues.PM_PAYER_TOTAL_AMOUNT.value,
                comprador_nombre: transactionDetailedInfo.payer.fullName,
                comprador_correo: transactionDetailedInfo.payer.emailAddress,
                comprador_tipo_documento: transactionDetailedInfo.payer.dniType,
                comprador_numero_documento: transactionDetailedInfo.payer.dniNumber,
                comprador_telefono: transactionDetailedInfo.extraParameters.PAYER_TELEPHONE,
                payu_referencia: payuResponse.referenceCode,
            });

            const shippingDetails = await models.ShippingDetails.create({
                envio_id: crypto.randomUUID(),
                pedido_id: order.pedido_id,
                envio_direccion: extraInfo.shippingAddress,
                envio_coordenadas: extraInfo.shippingCoordinates,
                envio_valor: 7500,
                envio_mensaje: extraInfo.payerMessage,
            });

            const carts = await models.Cart.findAll({
                where: { usuario_id: req.session.user.usuario_id },
                include: [{ model: models.Product, as: "product" }],
            });

            const cartItems = carts.map((cart) => {
                return {
                    pedido_id: order.pedido_id,
                    producto_id: cart.producto_id,
                    producto_cantidad: cart.producto_cantidad,
                    producto_precio: cart.product.producto_precio,
                };
            });

            const orderProducts = await models.OrderProduct.bulkCreate(cartItems, {
                transaction: t,
            });

            const workerBalances = {};

            const orderProductPromises = orderProducts.map(async (orderProduct) => {
                const product = await models.Product.findByPk(orderProduct.producto_id, {
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
                        producto_cantidad:
                            product.producto_cantidad - orderProduct.producto_cantidad,
                    },
                    {
                        where: { producto_id: orderProduct.producto_id },
                        transaction: t,
                    }
                );

                const userId = product.usuario_id;

                if (!workerBalances[userId]) {
                    workerBalances[userId] = parseInt(product.user.worker.trabajador_saldo);
                }

                workerBalances[userId] +=
                    parseInt(orderProduct.producto_precio) *
                    parseInt(orderProduct.producto_cantidad);

                // Escribir el nuevo saldo en la base de datos
                await models.Worker.update(
                    {
                        trabajador_saldo: workerBalances[userId],
                    },
                    {
                        where: { usuario_id: userId },
                        transaction: t,
                    }
                );
            });

            await Promise.all(orderProductPromises);

            const emptyCart = await models.Cart.destroy({
                where: { usuario_id: req.session.usuario_id },
                transaction: t,
            });

            await t.commit();

            const io = getSocket();

            const soldProducts = await Promise.all(
                cartItems.map((cartItem) => models.Product.findByPk(cartItem.producto_id))
            );

            io.emit("sale", soldProducts);

            res.redirect(`${process.env.VITE_URL}/order/${order.pedido_id}`);
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
                    where: { pedido_id: req.params.id },
                    transaction: t,
                });
            }

            if (req.body.shippingDetails) {
                await models.ShippingDetails.update(req.body.shippingDetails, {
                    where: { pedido_id: req.params.id },
                    transaction: t,
                });
            }

            if (req.body.delivery) {
                await models.Worker.update(req.body.delivery, {
                    where: { trabajador_id: req.body.delivery_id },
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
    
        if (req.query.pedido_estado) whereClause.pedido_estado = {
            [Op.in]: req.query.pedido_estado.split(","),
        };
        if (req.query.usuario_id) whereOrderProductClause.usuario_id = req.query.usuario_id;

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
