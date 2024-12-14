import * as models from "../models/relations.js";
import sequelize from "../config/database.js";
import { Op } from "sequelize";
import crypto from "crypto";

export default class RatingController {
    static createUserRating = async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const rating = await models.Rating.create({
                calificacion_id: crypto.randomUUID(),
                calificacion_comentario: req.body.calificacion_comentario,
                calificacion_imagen_url: req.body.calificacion_imagen_url || "",
                calificacion: req.body.calificacion,
                usuario_id: req.session.user.usuario_id,
            });

            const userRatings = await models.UsersCalifications.create({
                calificacion_id: rating.calificacion_id,
                usuario_id: req.params.id,
            });

            await t.commit();
            res.status(200).json({
                success: true,
                message: "Calificación creada correctamente.",
                data: rating,
            });
        } catch (error) {
            await t.rollback();
            res.status(404).json({
                success: false,
                message: error.message,
            });
        }
    };

    static createProductRating = async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const rating = await models.Rating.create({
                calificacion_id: crypto.randomUUID(),
                calificacion_comentario: req.body.calificacion_comentario,
                calificacion_imagen_url: req.body.calificacion_imagen_url || "",
                calificacion: req.body.calificacion,
                usuario_id: req.session.user.usuario_id,
            });

            const productRatings = await models.ProductsCalifications.create({
                calificacion_id: rating.calificacion_id,
                producto_id: req.params.id,
            });

            await t.commit();
            res.status(200).json({
                success: true,
                message: "Calificación creada correctamente.",
                data: rating,
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message,
            });
        }
    };

    static updateRating = async (req, res) => {
        try {
            const rating = await models.Rating.update(
                {
                    calificacion_comentario: req.body.calificacion_comentario,
                    calificacion_imagen_url:
                        req.body.calificacion_imagen_url || "",
                    calificacion: req.body.calificacion,
                },
                {
                    where: { calificacion_id: req.params.id },
                }
            );

            res.status(200).json({
                success: true,
                message: "Calificación creada correctamente.",
                data: rating,
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message,
            });
        }
    };

    static deleteRating = async (req, res) => {
        try {
            const rating = await models.Rating.destroy({
                where: { calificacion_id: req.params.id },
            });

            res.status(200).json({
                success: true,
                message: "Calificación creada correctamente.",
                data: rating,
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message,
            });
        }
    };
}
