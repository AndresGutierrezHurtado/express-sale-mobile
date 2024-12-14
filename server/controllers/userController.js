import * as models from "../models/relations.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { feedbackTemplate } from "../templates/email.templates.js";
import { Op } from "sequelize";

export default class UserController {
    static async getUsers(req, res) {
        let whereClause = {};

        if (req.query.search) {
            whereClause = {
                [Op.or]: {
                    user_id: { [Op.like]: `%${req.query.search}%` },
                    user_name: { [Op.like]: `%${req.query.search}%` },
                    user_email: { [Op.like]: `%${req.query.search}%` },
                },
            };
        }

        try {
            const users = await models.User.findAndCountAll({
                include: [
                    {
                        model: models.Role,
                        as: "role",
                    },
                ],
                where: whereClause,
                order: [
                    [
                        req.query.sort.split(":")[0] || "user_id",
                        req.query.sort.split(":")[1] || "ASC",
                    ],
                ],
                limit: 5,
                offset: (parseInt(req.query.page || 1) - 1) * 5,
            });

            res.status(200).json({
                success: true,
                message: "Usuarios obtenidos con éxito",
                data: {
                    ...users,
                    page: parseInt(req.query.page),
                    limit: 5,
                },
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al obtener los usuarios",
                error: error.message,
            });
        }
    }

    static async getUser(req, res) {
        try {
            const user = await models.User.findByPk(req.params.id, {
                include: [
                    {
                        model: models.Role,
                        as: "role",
                    },
                ],
            });

            res.status(200).json({
                success: true,
                message: "Usuario obtenido con éxito",
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al obtener el usuario",
                error: error.message,
            });
        }
    }

    static async createUser(req, res) {
        try {
            req.body.user.user_password = await bcrypt.hash(
                req.body.user.user_password,
                10
            );

            const user = await models.User.create(req.body.user);

            res.status(200).json({
                success: true,
                message: "Usuario creado con éxito",
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.errors[0].message,
                data: error,
            });
        }
    }

    static async updateUser(req, res) {
        try {
            if (req.body.user.user_password) {
                req.body.user.user_password = await bcrypt.hash(
                    req.body.user.user_password,
                    10
                );
            }

            const user = await models.User.update(req.body.user, {
                where: { user_id: req.params.id },
            });

            res.status(200).json({
                success: true,
                message: "Usuario actualizado con éxito",
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al actualizar el usuario",
                error: error.message,
            });
        }
    }

    static async authUser(req, res) {
        try {
            const user = await models.User.findOne({
                where: { user_email: req.body.user_email },
            });

            if (!user) {
                throw new Error("Usuario no encontrado");
                return;
            }

            if (
                !bcrypt.compareSync(req.body.user_password, user.user_password)
            ) {
                throw new Error("Contraseña inválida");
                return;
            }

            req.session.user_id = user.user_id;

            res.status(200).json({
                success: true,
                message: "usuario autenticado correctamente",
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al actualizar el usuario",
                error: error.message,
            });
        }
    }

    static async verifyUserSession(req, res) {
        if (!req.session.user_id) {
            return res.status(200).json({
                success: false,
                message: "Usuario no autenticado",
                data: null,
            });
        }

        res.status(200).json({
            success: true,
            message: "Usuario autenticado correctamente",
            data: req.session.user,
        });
    }

    static logoutUser(req, res) {
        try {
            req.session.user_id = null;
            req.session.destroy((err) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err.message,
                        data: null,
                    });
                    return;
                }
            });

            res.status(200).json({
                success: true,
                message: "Sesión cerrada correctamente",
                data: null,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    }

    static async sendFeedback(req, res) {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                service: process.env.EMAIL_SERVICE,
                port: process.env.EMAIL_PORT,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            transporter.sendMail(
                {
                    from: '"AC Computers" <andres52885241@gmail.com>',
                    to: "andres52885241@gmail.com",
                    subject: "Formulario contacto AC Computers",
                    html: feedbackTemplate(
                        req.body.email,
                        req.body.subject,
                        req.body.message
                    ),
                },
                (error, info) => {
                    if (error) {
                        throw new Error(error.message);
                    }
                }
            );

            res.status(200).json({
                success: true,
                message: "Mensaje enviado correctamente",
                data: null,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    }

    static async deleteUser(req, res) {
        try {
            const response = await models.User.destroy({
                where: { user_id: req.params.id },
            });

            res.status(200).json({
                success: true,
                message: "Usuario eliminado correctamente.",
                data: response,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: error,
            });
        }
    }
}
