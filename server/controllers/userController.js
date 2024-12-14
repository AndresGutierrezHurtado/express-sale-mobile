import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Config
import * as models from "../models/relations.js";
import sequelize from "../config/database.js";
import { Op, where } from "sequelize";

import { uploadFile } from "../config/uploadImage.js";
import { feedbackTemplate, recoveryTemplate } from "../templates/emailTemplates.js";

export default class UserController {
    static createUser = async (req, res) => {
        try {
            const t = await sequelize.transaction();

            const user = await models.User.create({
                usuario_id: crypto.randomUUID(),
                usuario_nombre: req.body.usuario_nombre,
                usuario_apellido: req.body.usuario_apellido,
                usuario_correo: req.body.usuario_correo,
                usuario_alias: req.body.usuario_alias,
                usuario_contra: bcrypt.hashSync(req.body.usuario_contra, 10),
                rol_id: req.body.rol_id,
            });

            if (user.rol_id == 2 || user.rol_id == 3) {
                const worker = await models.Worker.create({
                    trabajador_id: crypto.randomUUID(),
                    usuario_id: user.usuario_id,
                });
            }

            await t.commit();

            res.status(200).json({
                success: true,
                message: "Usuario creado correctamente.",
                data: user,
            });
        } catch (error) {
            t.rollback();

            // verificar si es que el correo/usuario ya existe
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

    static authUser = async (req, res) => {
        try {
            const { usuario_correo, usuario_contra } = req.body;

            const user = await models.User.findOne({
                where: { usuario_correo: usuario_correo },
            });

            if (!user) {
                return res.status(401).json({ success: false, message: "Usuario no encontrado" });
            }

            if (!bcrypt.compareSync(usuario_contra, user.usuario_contra)) {
                return res.status(200).json({ success: false, message: "Contraseña incorrecta" });
            }

            // express-session
            req.session.usuario_id = user.usuario_id;
            req.session.user = user;

            res.status(200).json({
                success: true,
                message: "El usuario esta autenticado",
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static verifyUserSession = async (req, res) => {
        if (!req.session.usuario_id) {
            return res
                .status(200)
                .json({ success: false, message: "Sesión no verificada", data: null });
        }

        res.status(200).json({
            success: true,
            message: "Sesión verificada correctamente",
            data: req.session.user,
        });
    };

    static logoutUser = (req, res) => {
        req.session.destroy();
        res.status(200).json({
            success: true,
            message: "Sesión cerrada correctamente",
            data: null,
        });
    };

    static updateUser = async (req, res) => {
        // validation
        let userData = req.body.user;
        let workerData = req.body.worker;

        if (userData && userData.usuario_contra) {
            userData.usuario_contra = bcrypt.hashSync(userData.usuario_contra, 10);
        }

        try {
            const t = await sequelize.transaction();

            // data updating
            if (userData) {
                if (req.body.usuario_imagen) {
                    const response = await uploadFile(
                        req.body.usuario_imagen,
                        req.params.id,
                        "/users"
                    );
                    if (response.success) {
                        userData = { ...userData, usuario_imagen_url: response.data.secure_url };
                    } else {
                        return res.status(500).json({
                            success: false,
                            message: response.message,
                            data: null,
                        });
                    }
                }
                const user = await models.User.update(userData, {
                    where: { usuario_id: req.params.id },
                });
            }
            if (workerData) {
                const worker = await models.Worker.update(workerData, {
                    where: { usuario_id: req.params.id },
                });
            }

            await t.commit();

            res.status(200).json({
                success: true,
                message: "Usuario actualizado correctamente.",
            });
        } catch (error) {
            await t.rollback();
            if (error.name == "SequelizeUniqueConstraintError") {
                console.error(error.errors);
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
            await models.User.destroy({ where: { usuario_id: req.params.id } });
            res.status(200).json({
                success: true,
                message: "Usuario eliminado correctamente.",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

    static getUsers = async (req, res) => {
        try {
            const users = await models.User.findAndCountAll({
                where: {
                    [Op.or]: [
                        {
                            usuario_alias: {
                                [Op.like]: `%${req.query.search || ""}%`,
                            },
                        },
                        {
                            usuario_correo: {
                                [Op.like]: `%${req.query.search || ""}%`,
                            },
                        },
                        {
                            usuario_nombre: {
                                [Op.like]: `%${req.query.search || ""}%`,
                            },
                        },
                        {
                            usuario_apellido: {
                                [Op.like]: `%${req.query.search || ""}%`,
                            },
                        },
                        {
                            usuario_id: {
                                [Op.like]: `%${req.query.search || ""}%`,
                            },
                        },
                    ],
                },
                limit: parseInt(req.query.limit || 5),
                offset: req.query.page ? (req.query.page - 1) * 5 : 0,
                include: ["role", "worker"],
                distinct: true,
                order: [
                    [
                        req.query.sort ? req.query.sort.split(":")[0] : "usuario_creacion",
                        req.query.sort ? req.query.sort.split(":")[1] : "ASC",
                    ],
                ],
            });
            res.status(200).json({
                success: true,
                message: "Usuarios obtenidos correctamente.",
                data: users,
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
                                SELECT COALESCE(ROUND(AVG(calificaciones.calificacion), 2),0)
                                FROM calificaciones
                                INNER JOIN calificaciones_usuarios ON calificaciones.calificacion_id = calificaciones_usuarios.calificacion_id
                                WHERE calificaciones_usuarios.usuario_id = User.usuario_id
                            )`),
                            "calificacion_promedio",
                        ],
                        [
                            sequelize.literal(`(
                                SELECT COALESCE(COUNT(*) ,0)
                                FROM calificaciones
                                INNER JOIN calificaciones_usuarios ON calificaciones.calificacion_id = calificaciones_usuarios.calificacion_id
                                WHERE calificaciones_usuarios.usuario_id = User.usuario_id
                            )`),
                            "calificacion_cantidad",
                        ],
                        [
                            sequelize.literal(`(
                                SELECT COALESCE(COUNT(*) ,0)
                                FROM detalles_envios
                                INNER JOIN trabajadores ON User.usuario_id = trabajadores.usuario_id
                                INNER JOIN pedidos ON detalles_envios.pedido_id = pedidos.pedido_id
                                WHERE trabajadores.trabajador_id = detalles_envios.trabajador_id
                                AND pedidos.pedido_estado = "recibido"
                            )`),
                            "envios_cantidad",
                        ],
                        [
                            sequelize.literal(`(
                                SELECT COALESCE(SUM(detalles_envios.envio_valor) ,0)
                                FROM detalles_envios
                                INNER JOIN trabajadores ON User.usuario_id = trabajadores.usuario_id
                                INNER JOIN pedidos ON detalles_envios.pedido_id = pedidos.pedido_id
                                WHERE trabajadores.trabajador_id = detalles_envios.trabajador_id AND pedidos.pedido_estado = "recibido"
                            )`),
                            "envios_dinero",
                        ],
                        [
                            sequelize.literal(`(
                                SELECT COALESCE(COUNT(*) ,0)
                                FROM productos_pedidos
                                INNER JOIN productos ON productos_pedidos.producto_id = productos.producto_id
                                WHERE productos.usuario_id = User.usuario_id
                            )`),
                            "ventas_cantidad",
                        ],
                        [
                            sequelize.literal(`(
                                SELECT COALESCE(SUM(productos_pedidos.producto_precio * productos_pedidos.producto_cantidad) ,0)
                                FROM productos_pedidos
                                INNER JOIN productos ON productos_pedidos.producto_id = productos.producto_id
                                WHERE productos.usuario_id = User.usuario_id
                            )`),
                            "ventas_dinero",
                        ],
                    ],
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
                    SELECT MONTH(pedidos.pedido_fecha) AS mes, YEAR(pedidos.pedido_fecha) AS anio, COUNT(*) AS total_envios, SUM(detalles_envios.envio_valor) AS dinero_envios
                    FROM detalles_envios
                    INNER JOIN pedidos ON detalles_envios.pedido_id = pedidos.pedido_id
                    INNER JOIN trabajadores ON trabajadores.trabajador_id = detalles_envios.trabajador_id
                    WHERE detalles_envios.trabajador_id = "${req.session.user.worker.trabajador_id}" AND pedidos.pedido_estado = "recibido"
                    GROUP BY MONTH(pedidos.pedido_fecha)
                    ORDER BY mes;
                `
            );

            const yearSales = await sequelize.query(
                `
                    SELECT MONTH(pedidos.pedido_fecha) AS mes, YEAR(pedidos.pedido_fecha) AS anio, SUM(productos_pedidos.producto_cantidad) AS total_productos, SUM(productos_pedidos.producto_precio * productos_pedidos.producto_cantidad) AS dinero_ventas
                    FROM productos_pedidos
                    INNER JOIN productos ON productos_pedidos.producto_id = productos.producto_id
                    INNER JOIN pedidos ON pedidos.pedido_id = productos_pedidos.pedido_id
                    INNER JOIN detalles_pagos ON pedidos.pedido_id = detalles_pagos.pedido_id
                    WHERE productos.usuario_id = "${req.params.id}"
                    GROUP BY MONTH(pedidos.pedido_fecha)
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
                    `${process.env.VITE_URL}/reset-password/${recovery.recuperacion_id}`
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
