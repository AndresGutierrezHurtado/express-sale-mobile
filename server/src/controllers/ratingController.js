import * as models from "../models/index.js";
import sequelize from "../configs/database.js";
import { Op } from "sequelize";
import crypto from "crypto";

export default class RatingController {
    static createUserRating = async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const rating = await models.Rating.create({
                rating_id: crypto.randomUUID(),
                rating_comment: req.body.rating_comment,
                rating_image_url: req.body.rating_image_url || "",
                calificacion: req.body.calificacion,
                user_id: req.session.user.user_id,
            });

            const userRatings = await models.UsersCalifications.create({
                rating_id: rating.rating_id,
                user_id: req.params.id,
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
                rating_id: crypto.randomUUID(),
                rating_comment: req.body.rating_comment,
                rating_image_url: req.body.rating_image_url || "",
                calificacion: req.body.calificacion,
                user_id: req.session.user.user_id,
            });

            const productRatings = await models.ProductsCalifications.create({
                rating_id: rating.rating_id,
                product_id: req.params.id,
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
                    rating_comment: req.body.rating_comment,
                    rating_image_url:
                        req.body.rating_image_url || "",
                    calificacion: req.body.calificacion,
                },
                {
                    where: { rating_id: req.params.id },
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
                where: { rating_id: req.params.id },
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
