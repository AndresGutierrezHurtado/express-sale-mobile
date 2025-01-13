import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Database
import sequelize from "../configs/database.js";
import { Op } from "sequelize";
import * as models from "../models/index.js";

// Hooks
import { uploadFile, deleteFile } from "../configs/uploadImage.js";
import { feedbackTemplate, recoveryTemplate } from "../templates/emailTemplates.js";

export default class UserController {
    static createUser = async (req, res) => {
        const transaction = await sequelize.transaction();

        try {
            req.body.user.user_password = bcrypt.hashSync(req.body.user.user_password, 10);

            const user = await models.User.create(req.body.user, {
                transaction,
            });

            if (user.role_id == 2 || user.role_id == 3) {
                const worker = await models.Worker.create(
                    {
                        user_id: user.user_id,
                    },
                    {
                        transaction,
                    }
                );
            }

            await transaction.commit();

            return res.status(200).json({
                success: true,
                message: "Usuario creado correctamente.",
                data: user,
            });
        } catch (error) {
            transaction.rollback();

            if (error.name === "SequelizeUniqueConstraintError") {
                return res.status(500).json({
                    success: false,
                    message: "El correo/alias ya existe.",
                });
            } else {
                return res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
        }
    };

    static updateUser = async (req, res) => {
        let userData = req.body.user;
        let workerData = req.body.worker;

        if (userData && userData.user_password) {
            userData.user_password = bcrypt.hashSync(userData.user_password, 10);
        }

        try {
            const transaction = await sequelize.transaction();

            if (userData) {
                if (req.body.user_image) {
                    const response = await uploadFile(req.body.user_image, req.params.id, "/users");

                    if (response.success) {
                        userData = { ...userData, user_image_url: response.data };
                    } else {
                        return res.status(500).json({
                            success: false,
                            message: response.message,
                            data: null,
                        });
                    }
                }

                const user = await models.User.update(userData, {
                    where: { user_id: req.params.id },
                    transaction,
                });
            }

            if (workerData) {
                const worker = await models.Worker.update(workerData, {
                    where: { user_id: req.params.id },
                    transaction,
                });
            }

            await transaction.commit();

            return res.status(200).json({
                success: true,
                message: "Usuario actualizado correctamente.",
            });
        } catch (error) {
            await transaction.rollback();

            if (error.name == "SequelizeUniqueConstraintError") {
                return res.status(500).json({
                    success: false,
                    message: "El campo " + error.errors[0].value + " ya lo tiene otro usuario.",
                });
            } else {
                return res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
        }
    };

    static deleteUser = async (req, res) => {
        try {
            await deleteFile("express-sale/users/" + req.params.id);

            await models.User.destroy({ where: { user_id: req.params.id } });

            return res.status(200).json({
                success: true,
                message: "Usuario eliminado correctamente.",
                data: null,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static getUsers = async (req, res) => {
        const limit = parseInt(req.query.limit || 5);
        const page = parseInt(req.query.page || 1);
        const offset = (page - 1) * limit;
        const order = req.query.sort ? req.query.sort.split(":") : ["user_date", "ASC"];

        const whereClause = {
            [Op.or]: [
                {
                    user_alias: {
                        [Op.like]: `%${req.query.search || ""}%`,
                    },
                },
                {
                    user_email: {
                        [Op.like]: `%${req.query.search || ""}%`,
                    },
                },
                {
                    user_name: {
                        [Op.like]: `%${req.query.search || ""}%`,
                    },
                },
                {
                    user_lastname: {
                        [Op.like]: `%${req.query.search || ""}%`,
                    },
                },
                {
                    user_id: {
                        [Op.like]: `%${req.query.search || ""}%`,
                    },
                },
            ],
        };

        try {
            const users = await models.User.findAndCountAll({
                distinct: true,
                where: whereClause,
                include: ["role", "worker"],
                attributes: {
                    exclude: ["user_password"],
                },
                limit,
                offset,
                order: [order],
            });

            return res.status(200).json({
                success: true,
                message: "Usuarios obtenidos correctamente.",
                data: {
                    ...users,
                    limit,
                    page,
                },
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static getUser = async (req, res) => {
        try {
            const user = await models.User.findByPk(req.params.id, {
                attributes: {
                    include: [
                        [
                            sequelize.literal(`(
                                SELECT COALESCE(ROUND(AVG(ratings.rating_value), 2),0)
                                FROM ratings
                                INNER JOIN user_ratings ON ratings.rating_id = user_ratings.rating_id
                                WHERE user_ratings.user_id = User.user_id
                            )`),
                            "average_rating",
                        ],
                        [
                            sequelize.literal(`(
                                SELECT COALESCE(COUNT(*) ,0)
                                FROM ratings
                                INNER JOIN user_ratings ON ratings.rating_id = user_ratings.rating_id
                                WHERE user_ratings.user_id = User.user_id
                            )`),
                            "ratings_count",
                        ],
                        [
                            sequelize.literal(`(
                                SELECT COALESCE(COUNT(*) ,0)
                                FROM shipping_details
                                INNER JOIN workers ON User.user_id = workers.user_id
                                INNER JOIN orders ON shipping_details.order_id = orders.order_Id
                                WHERE workers.worker_id = shipping_details.worker_id
                                AND orders.order_status = "recibido"
                            )`),
                            "shippings_count",
                        ],
                        [
                            sequelize.literal(`(
                                SELECT COALESCE(SUM(shipping_details.shipping_cost) ,0)
                                FROM shipping_details
                                INNER JOIN workers ON User.user_id = workers.user_id
                                INNER JOIN orders ON shipping_details.order_Id = orders.order_Id
                                WHERE workers.worker_id = shipping_details.worker_id
                                AND orders.order_status = "recibido"
                            )`),
                            "shippings_money",
                        ],
                        [
                            sequelize.literal(`(
                                SELECT COALESCE(COUNT(*) ,0)
                                FROM order_products
                                INNER JOIN products ON order_products.product_id = products.product_id
                                WHERE products.user_id = User.user_id
                            )`),
                            "sales_count",
                        ],
                        [
                            sequelize.literal(`(
                                SELECT COALESCE(SUM(order_products.product_price * order_products.product_quantity) ,0)
                                FROM order_products
                                INNER JOIN products ON order_products.product_id = products.product_id
                                WHERE products.user_id = User.user_id
                            )`),
                            "sales_money",
                        ],
                    ],
                    exclude: ["user_password"],
                },
                include: ["role", "worker"],
            });

            if (!user.worker) {
                return res.status(200).json({
                    success: true,
                    message: "Usuario obtenido correctamente.",
                    data: user,
                });
            }

            const yearDeliveries = await sequelize.query(
                `
                    SELECT
                        MONTH(orders.order_date) AS month,
                        YEAR(orders.order_date) AS anio,
                        COUNT(*) AS shippings_quantity,
                        SUM(shipping_details.shipping_cost) AS shipping_money
                    FROM shipping_details
                        INNER JOIN orders ON shipping_details.order_id = orders.order_id
                        INNER JOIN workers ON workers.worker_id = shipping_details.worker_id
                    WHERE shipping_details.worker_id = "${user.worker.worker_id}" AND orders.order_status = "recibido"
                    GROUP BY MONTH(orders.order_date)
                    ORDER BY month;
                `
            );

            const yearSales = await sequelize.query(
                `
                    SELECT
                        MONTH(orders.order_date) AS month,
                        YEAR(orders.order_date) AS anio,
                        SUM(order_products.product_quantity) AS total_products,
                        SUM(order_products.product_price * order_products.product_quantity) AS total_money
                    FROM order_products
                        INNER JOIN products ON order_products.product_id = products.product_id
                        INNER JOIN orders ON orders.order_id = order_products.order_id
                        INNER JOIN payment_details ON orders.order_id = payment_details.order_id
                    WHERE products.user_id = "${req.params.id}"
                    GROUP BY MONTH(orders.order_date)
                    ORDER BY month;
                `
            );

            const MostSelledProducts = await sequelize.query(
                `
                    SELECT
                        products.product_id,
                        products.product_image_url,
                        products.product_name,
                        SUM(order_products.product_quantity) AS total_selled
                    FROM order_products
                        INNER JOIN products ON order_products.product_id = products.product_id
                    WHERE products.user_id = "${req.params.id}"
                    GROUP BY products.product_id
                    ORDER BY total_selled DESC
                    LIMIT 5;
                `
            );

            const result = user.worker
                ? {
                      ...user.toJSON(),
                      worker: {
                          ...user.worker.toJSON(),
                          total_selled: yearSales[0],
                          month_deliveries: yearDeliveries[0],
                          most_selled_products: MostSelledProducts[0],
                      },
                  }
                : user.toJSON();

            return res.status(200).json({
                success: true,
                message: "Usuario obtenido correctamente.",
                data: result,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static getUserProducts = async (req, res) => {
        try {
            const limit = parseInt(req.query.limit || 5);
            const page = parseInt(req.query.page || 1);
            const offset = (page - 1) * limit;

            const where = {
                [Op.and]: [
                    {
                        product_status: "publico",
                    },
                    {
                        user_id: req.params.id,
                    },
                    {
                        [Op.or]: [
                            {
                                product_name: {
                                    [Op.like]: `%${req.query.search || ""}%`,
                                },
                            },
                            {
                                product_description: {
                                    [Op.like]: `%${req.query.search || ""}%`,
                                },
                            },
                        ],
                    },
                    {
                        product_price: {
                            [Op.gte]: req.query.min || 0,
                        },
                    },
                    {
                        product_price: {
                            [Op.lte]: req.query.max || 9999999999,
                        },
                    },
                    {
                        category_id: {
                            [Op.in]: req.query.category_id ? [req.query.category_id] : [1, 2, 3, 4],
                        },
                    },
                ],
            };

            const querySort = req.query?.sort?.split(":") || ["`average_rating`", "DESC"];
            const order = [sequelize.literal(querySort[0]), querySort[1]];

            const products = await models.Product.findAndCountAll({
                include: ["category"],
                attributes: {
                    include: [
                        [
                            sequelize.literal(`(
                                SELECT COALESCE(ROUND(AVG(ratings.rating_value), 2), 0)
                                FROM ratings
                                INNER JOIN product_ratings ON ratings.rating_id = product_ratings.rating_id
                                WHERE product_ratings.product_id = Product.product_id
                            )`),
                            "average_rating",
                        ],
                        [
                            sequelize.literal(`(
                                SELECT COALESCE(COUNT(*), 0)
                                FROM ratings
                                INNER JOIN product_ratings ON ratings.rating_id = product_ratings.rating_id
                                WHERE product_ratings.product_id = Product.product_id
                            )`),
                            "rating_count",
                        ],
                    ],
                },
                where,
                limit,
                offset,
                distinct: true,
                order: [order],
            });

            return res.status(200).json({
                success: true,
                message: "Productos obtenidos correctamente.",
                data: { ...products, limit, page, offset },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static getUserOrders = async (req, res) => {
        try {
            const orders = await models.Order.findAll({
                where: { user_id: req.params.id },
                include: [
                    { model: models.PaymentDetails, as: "paymentDetails" },
                    {
                        model: models.ShippingDetails,
                        as: "shippingDetails",
                        include: {
                            model: models.Worker,
                            as: "worker",
                            include: { model: models.User, as: "user" },
                        },
                    },
                    {
                        model: models.OrderProduct,
                        as: "orderProducts",
                        include: { model: models.Product, as: "product" },
                    },
                ],
            });
            return res.status(200).json({
                success: true,
                message: "Ordenes obtenidas correctamente.",
                data: orders,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static getUserRatings = async (req, res) => {
        try {
            const { ratings } = await models.User.findByPk(req.params.id, {
                include: [
                    {
                        model: models.Rating,
                        as: "ratings",
                        through: { attributes: [] },
                        include: [{ model: models.User, as: "calificator" }],
                    },
                ],
            });

            return res.status(200).json({
                success: true,
                message: "Calificaciones obtenidas correctamente.",
                data: ratings,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static getUserCart = async (req, res) => {
        try {
            const cart = await models.Cart.findAll({
                where: { user_id: req.params.id },
                include: [{ model: models.Product, as: "product" }],
            });

            return res.status(200).json({
                success: true,
                message: "Carrito obtenido correctamente.",
                data: cart,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static createUserCart = async (req, res) => {
        try {
            const cart = await models.Cart.findOne({
                where: {
                    product_id: req.body.product_id,
                    user_id: req.session.user_id,
                },
            });

            if (cart) {
                await models.Cart.update(
                    {
                        product_quantity: cart.product_quantity + 1,
                    },
                    {
                        where: { cart_id: cart.cart_id },
                    }
                );
                return res.status(200).json({
                    success: true,
                    message: "Carrito actualizado correctamente.",
                    data: cart,
                });
            }

            const newCart = await models.Cart.create({
                cart_id: crypto.randomUUID(),
                user_id: req.session.user_id,
                product_id: req.body.product_id,
            });

            return res.status(200).json({
                success: true,
                message: "Carrito creado correctamente.",
                data: newCart,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static updateUserCart = async (req, res) => {
        try {
            const cart = await models.Cart.update(
                {
                    product_quantity: req.body.product_quantity,
                },
                {
                    where: { cart_id: req.params.id },
                }
            );

            return res.status(200).json({
                success: true,
                message: "Carrito actualizado correctamente.",
                data: cart,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static deleteUserCart = async (req, res) => {
        try {
            const cart = await models.Cart.destroy({
                where: { cart_id: req.params.id },
            });

            return res.status(200).json({
                success: true,
                message: "Carrito eliminado correctamente.",
                data: cart,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static emptyUserCart = async (req, res) => {
        try {
            const cart = await models.Cart.destroy({
                where: { user_id: req.session.user_id },
            });

            return res.status(200).json({
                success: true,
                message: "Carrito vaciado correctamente.",
                data: cart,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static getUserWithdrawals = async (req, res) => {
        try {
            const user = await models.User.findByPk(req.params.id, {
                include: ["worker"],
            });

            const deliveryShippings = await models.ShippingDetails.findAll({
                where: { worker_id: user.worker.worker_id },
            });

            const sellerSales = await models.OrderProduct.findAll({
                include: [
                    { model: models.Product, as: "product", where: { user_id: req.params.id } },
                    { model: models.Order, as: "order" },
                ],
            });

            const withdrawalsDb = await models.Withdrawal.findAll({
                where: { worker_id: user.worker.worker_id },
            });

            const withdrawals = withdrawalsDb.map((withdrawal) => ({
                id: withdrawal.withdrawal_id,
                amount: withdrawal.withdrawal_amount,
                date: withdrawal.withdrawal_date,
                type: "retiro",
            }));

            const deliveryEarnings = deliveryShippings.map((shipping) => ({
                id: shipping.shipping_id,
                amount: shipping.shipping_cost,
                date: shipping.shipping_start,
                type: "ingreso",
            }));

            const sellerEarnings = sellerSales.map((sale) => ({
                id: crypto.randomUUID(),
                amount: sale.product_price * sale.product_quantity,
                date: sale.order.order_date,
                type: "ingreso",
            }));

            return res.status(200).json({
                success: true,
                message: "Retiros obtenidos correctamente.",
                data: [...deliveryEarnings, ...withdrawals, ...sellerEarnings],
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static createUserWithdrawal = async (req, res) => {
        try {
            const withdrawal = await models.Withdrawal.create({
                withdrawal_id: crypto.randomUUID(),
                worker_id: req.session.user.worker.worker_id,
                withdrawal_amount: req.body.withdrawal_amount,
            });

            await models.Worker.update(
                {
                    worker_balance:
                        req.session.user.worker.worker_balance - req.body.withdrawal_amount,
                },
                {
                    where: { worker_id: req.session.user.worker.worker_id },
                }
            );

            return res.status(200).json({
                success: true,
                message: "Retiro creado correctamente.",
                data: withdrawal,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static createRecovery = async (req, res) => {
        try {
            const user = await models.User.findOne({
                where: { user_email: req.body.user_email },
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "El correo ingresado no existe.",
                });
            }

            const recovery = await models.Recovery.create({
                user_id: user.user_id,
            });

            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: user.user_email,
                subject: "Recupera tu contraseña | Express Sale",
                html: recoveryTemplate(
                    `${process.env.EXPO_PUBLIC_APP_DOMAIN}/reset-password/${recovery.recovery_id}`
                ),
            });

            return res.status(200).json({
                success: true,
                message: "Recuperación creada correctamente.",
                data: recovery,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static getRecovery = async (req, res) => {
        try {
            const recovery = await models.Recovery.findOne({
                where: { recovery_id: req.params.token },
            });

            if (!recovery) {
                return res.status(404).json({
                    success: false,
                    message: "La recuperación no existe.",
                    data: null,
                });
            }

            if (new Date().getTime() >= new Date(recovery.recovery_expiration).getTime()) {
                return res.status(404).json({
                    success: false,
                    message: "La recuperación ha expirado.",
                    data: null,
                });
            }

            return res.status(200).json({
                success: true,
                message: "Recuperación obtenida correctamente.",
                data: recovery,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static updateRecovery = async (req, res) => {
        try {
            const recovery = await models.Recovery.update(
                {
                    recovery_expiration: new Date().toISOString(),
                },
                {
                    where: { recovery_id: req.params.token },
                }
            );

            const user = await models.User.update(
                {
                    user_password: bcrypt.hashSync(req.body.user_password, 10),
                },
                {
                    where: { user_id: req.body.user_id },
                }
            );

            return res.status(200).json({
                success: true,
                message: "Recuperación actualizada correctamente.",
                data: { recovery, user },
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static createUserFeedback = async (req, res) => {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER,
                subject: `Formulario de contacto de usuario ${req.body.user_name} | Express Sale`,
                html: feedbackTemplate(
                    req.body.email_subject,
                    req.body.email_message,
                    req.body.user_name,
                    req.body.user_email,
                    req.session.user
                ),
            });

            return res.status(200).json({
                success: true,
                message: "Recuperación creada correctamente.",
                data: null,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };
}
