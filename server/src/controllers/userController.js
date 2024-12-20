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
            const user = await models.User.create(req.body.user, {
                transaction,
            });

            if (user.rol_id == 2 || user.rol_id == 3) {
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

            res.status(200).json({
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
                res.status(500).json({
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
                    const response = await uploadFile(
                        req.body.user_image,
                        req.params.id,
                        "/users"
                    );

                    if (response.success) {
                        userData = { ...userData, user_image_url: response.data.secure_url };
                    } else {
                        res.status(500).json({
                            success: false,
                            message: response.message,
                            data: null,
                        });
                        return;
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

            res.status(200).json({
                success: true,
                message: "Usuario actualizado correctamente.",
            });
        } catch (error) {
            await transaction.rollback();

            if (error.name == "SequelizeUniqueConstraintError") {
                res.status(500).json({
                    success: false,
                    message: "El campo " + error.errors[0].value + " ya lo tiene otro usuario.",
                });
            } else {
                res.status(500).json({
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

            res.status(200).json({
                success: true,
                message: "Usuario eliminado correctamente.",
                data: null
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null
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

            res.status(200).json({
                success: true,
                message: "Usuarios obtenidos correctamente.",
                data: {
                    ...users,
                    limit,
                    page,
                },
            });
        } catch (error) {
            res.status(500).json({
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
                            "calificacion_promedio",
                        ],
                        [
                            sequelize.literal(`(
                                SELECT COALESCE(COUNT(*) ,0)
                                FROM ratings
                                INNER JOIN user_ratings ON ratings.rating_id = user_ratings.rating_id
                                WHERE user_ratings.user_id = User.user_id
                            )`),
                            "calificacion_cantidad",
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
                            "envios_cantidad",
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
                            "envios_dinero",
                        ],
                        [
                            sequelize.literal(`(
                                SELECT COALESCE(COUNT(*) ,0)
                                FROM order_products
                                INNER JOIN products ON order_products.product_id = products.product_id
                                WHERE products.user_id = User.user_id
                            )`),
                            "ventas_cantidad",
                        ],
                        [
                            sequelize.literal(`(
                                SELECT COALESCE(SUM(order_products.product_price * order_products.product_quantity) ,0)
                                FROM order_products
                                INNER JOIN products ON order_products.product_id = products.product_id
                                WHERE products.user_id = User.user_id
                            )`),
                            "ventas_dinero",
                        ],
                    ],
                    exclude: ["user_password"],
                },
                include: ["role", "worker"],
            });

            if (!user.worker) {
                res.status(200).json({
                    success: true,
                    message: "Usuario obtenido correctamente.",
                    data: user,
                });
                return;
            }

            const yearDeliveries = await sequelize.query(
                `
                    SELECT MONTH(orders.order_date) AS mes, YEAR(orders.order_date) AS anio, COUNT(*) AS shippings_quantity, SUM(shipping_details.shipping_cost) AS shipping_money
                    FROM shipping_details
                    INNER JOIN orders ON shipping_details.order_id = orders.order_id
                    INNER JOIN workers ON worker.worker_id = shipping_details.worker_id
                    WHERE shipping_details.worker_id = "${req.session.user.worker.worker_id}" AND orders.order_status = "recibido"
                    GROUP BY MONTH(orders.pedido_fecha)
                    ORDER BY mes;
                `
            );

            const yearSales = await sequelize.query(
                `
                    SELECT MONTH(orders.pedido_fecha) AS mes, YEAR(orders.pedido_fecha) AS anio, SUM(productos_pedidos.producto_cantidad) AS total_productos, SUM(productos_pedidos.producto_precio * productos_pedidos.producto_cantidad) AS dinero_ventas
                    FROM productos_pedidos
                    INNER JOIN productos ON productos_pedidos.producto_id = productos.producto_id
                    INNER JOIN orders ON orders.pedido_id = productos_pedidos.pedido_id
                    INNER JOIN detalles_pagos ON orders.pedido_id = detalles_pagos.pedido_id
                    WHERE productos.usuario_id = "${req.params.id}"
                    GROUP BY MONTH(orders.pedido_fecha)
                    ORDER BY mes;
                `
            );

            const MostSelledProducts = await sequelize.query(
                `
                    SELECT productos.producto_id, productos.producto_imagen_url, productos.producto_nombre, SUM(productos_pedidos.producto_cantidad) AS total_ventas
                    FROM productos_pedidos
                    INNER JOIN productos ON productos_pedidos.producto_id = productos.producto_id
                    WHERE productos.usuario_id = "${req.params.id}"
                    GROUP BY productos.producto_id
                    ORDER BY total_ventas DESC
                    LIMIT 5;
                `
            );

            const result = user.worker
                ? {
                      ...user.toJSON(),
                      worker: {
                          ...user.worker.toJSON(),
                          ventas_mensuales: yearSales[0],
                          envios_mensuales: yearDeliveries[0],
                          most_selled_products: MostSelledProducts[0],
                      },
                  }
                : user.toJSON();

            res.status(200).json({
                success: true,
                message: "Usuario obtenido correctamente.",
                data: result,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static getUserProducts = async (req, res) => {
        try {
            const products = await models.Product.findAndCountAll({
                limit: parseInt(req.query.limit || 5),
                offset: req.query.page ? (req.query.page - 1) * 5 : 0,
                where: { usuario_id: req.params.id },
                include: ["category"],
                attributes: {
                    include: [
                        [
                            sequelize.literal(`(
                                SELECT COALESCE(ROUND(AVG(calificaciones.calificacion), 2), 0)
                                FROM calificaciones
                                INNER JOIN calificaciones_productos ON calificaciones.calificacion_id = calificaciones_productos.calificacion_id
                                WHERE calificaciones_productos.producto_id = Product.producto_id
                            )`),
                            "calificacion_promedio",
                        ],
                        [
                            sequelize.literal(`(
                                SELECT COALESCE(COUNT(*), 0)
                                FROM calificaciones
                                INNER JOIN calificaciones_productos ON calificaciones.calificacion_id = calificaciones_productos.calificacion_id
                                WHERE calificaciones_productos.producto_id = Product.producto_id
                            )`),
                            "calificacion_cantidad",
                        ],
                    ],
                },
            });
            res.status(200).json({
                success: true,
                message: "Productos obtenidos correctamente.",
                data: products,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static getUserOrders = async (req, res) => {
        try {
            const orders = await models.Order.findAll({
                where: { usuario_id: req.params.id },
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
            res.status(200).json({
                success: true,
                message: "Ordenes obtenidas correctamente.",
                data: orders,
            });
        } catch (error) {
            res.status(500).json({
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

            res.status(200).json({
                success: true,
                message: "Calificaciones obtenidas correctamente.",
                data: ratings,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static getUserCart = async (req, res) => {
        try {
            const cart = await models.Cart.findAll({
                where: { usuario_id: req.params.id },
                include: [{ model: models.Product, as: "product" }],
            });

            res.status(200).json({
                success: true,
                message: "Carrito obtenido correctamente.",
                data: cart,
            });
        } catch (error) {
            res.status(500).json({
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
                    producto_id: req.body.producto_id,
                    usuario_id: req.session.usuario_id,
                },
            });

            if (cart) {
                await models.Cart.update(
                    {
                        producto_cantidad: cart.producto_cantidad + 1,
                    },
                    {
                        where: { carrito_id: cart.carrito_id },
                    }
                );
                return res.status(200).json({
                    success: true,
                    message: "Carrito actualizado correctamente.",
                    data: cart,
                });
            }

            const newCart = await models.Cart.create({
                carrito_id: crypto.randomUUID(),
                usuario_id: req.session.usuario_id,
                producto_id: req.body.producto_id,
            });

            res.status(200).json({
                success: true,
                message: "Carrito creado correctamente.",
                data: newCart,
            });
        } catch (error) {
            res.status(500).json({
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
                    producto_cantidad: req.body.producto_cantidad,
                },
                {
                    where: { carrito_id: req.params.id },
                }
            );

            res.status(200).json({
                success: true,
                message: "Carrito actualizado correctamente.",
                data: cart,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static deleteUserCart = async (req, res) => {
        try {
            const cart = await models.Cart.destroy({
                where: { carrito_id: req.params.id },
            });

            res.status(200).json({
                success: true,
                message: "Carrito eliminado correctamente.",
                data: cart,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static emptyUserCart = async (req, res) => {
        try {
            const cart = await models.Cart.destroy({
                where: { usuario_id: req.session.usuario_id },
            });
            res.status(200).json({
                success: true,
                message: "Carrito vaciado correctamente.",
                data: cart,
            });
        } catch (error) {
            res.status(500).json({
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
                where: { trabajador_id: user.worker.trabajador_id },
            });

            const sellerSales = await models.OrderProduct.findAll({
                include: [
                    { model: models.Product, as: "product", where: { usuario_id: req.params.id } },
                    { model: models.Order, as: "order" },
                ],
            });

            const withdrawalsDb = await models.Withdrawal.findAll({
                where: { trabajador_id: user.worker.trabajador_id },
            });

            const withdrawals = withdrawalsDb.map((withdrawal) => ({
                id: withdrawal.retiro_id,
                valor: withdrawal.retiro_valor,
                fecha: withdrawal.retiro_fecha,
                tipo: "retiro",
            }));

            const deliveryEarnings = deliveryShippings.map((shipping) => ({
                id: shipping.envio_id,
                valor: shipping.envio_valor,
                fecha: shipping.fecha_inicio,
                tipo: "ingreso",
            }));

            const sellerEarnings = sellerSales.map((sale) => ({
                id: crypto.randomUUID(),
                valor: sale.producto_precio * sale.producto_cantidad,
                fecha: sale.order.pedido_fecha,
                tipo: "ingreso",
            }));

            res.status(200).json({
                success: true,
                message: "Retiros obtenidos correctamente.",
                data: [...deliveryEarnings, ...withdrawals, ...sellerEarnings],
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static createUserWithdrawal = async (req, res) => {
        try {
            const withdrawal = await models.Withdrawal.create({
                retiro_id: crypto.randomUUID(),
                trabajador_id: req.session.user.worker.trabajador_id,
                retiro_valor: req.body.retiro_valor,
            });

            await models.Worker.update(
                {
                    trabajador_saldo:
                        req.session.user.worker.trabajador_saldo - req.body.retiro_valor,
                },
                {
                    where: { trabajador_id: req.session.user.worker.trabajador_id },
                }
            );

            res.status(200).json({
                success: true,
                message: "Retiro creado correctamente.",
                data: withdrawal,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static createRecovery = async (req, res) => {
        try {
            const user = await models.User.findOne({
                where: { usuario_correo: req.body.usuario_correo },
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "El correo ingresado no existe.",
                });
            }

            const recovery = await models.Recovery.create({
                recuperacion_id: crypto.randomUUID(),
                usuario_id: user.usuario_id,
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
                to: user.usuario_correo,
                subject: "Recupera tu contraseña | Express Sale",
                html: recoveryTemplate(
                    `${process.env.EXPO_PUBLIC_APP_DOMAIN}/reset-password/${recovery.recuperacion_id}`
                ),
            });

            res.status(200).json({
                success: true,
                message: "Recuperación creada correctamente.",
                data: recovery,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static getRecovery = async (req, res) => {
        try {
            const recovery = await models.Recovery.findOne({
                where: { recuperacion_id: req.params.token },
            });

            if (!recovery) {
                return res.status(404).json({
                    success: false,
                    message: "La recuperación no existe.",
                    data: null,
                });
            }

            if (new Date().getTime() >= new Date(recovery.fecha_expiracion).getTime()) {
                return res.status(404).json({
                    success: false,
                    message: "La recuperación ha expirado.",
                    data: null,
                });
            }

            res.status(200).json({
                success: true,
                message: "Recuperación obtenida correctamente.",
                data: recovery,
            });
        } catch (error) {
            res.status(500).json({
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
                    fecha_expiracion: new Date().toISOString(),
                },
                {
                    where: { recuperacion_id: req.params.token },
                }
            );

            const user = await models.User.update(
                {
                    usuario_contra: bcrypt.hashSync(req.body.usuario_contra, 10),
                },
                {
                    where: { usuario_id: req.body.usuario_id },
                }
            );

            res.status(200).json({
                success: true,
                message: "Recuperación actualizada correctamente.",
                data: { recovery, user },
            });
        } catch (error) {
            res.status(500).json({
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
                subject: `Formulario de contacto de usuario ${req.body.usuario_nombre} | Express Sale`,
                html: feedbackTemplate(
                    req.body.correo_asunto,
                    req.body.correo_mensaje,
                    req.body.usuario_nombre,
                    req.body.usuario_correo,
                    req.session.user
                ),
            });

            res.status(200).json({
                success: true,
                message: "Recuperación creada correctamente.",
                data: null,
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
