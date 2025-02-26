import * as models from "../models/index.js";
import sequelize from "../configs/database.js";
import { Op } from "sequelize";
import crypto from "crypto";

export default class RatingController {
    static createUserRating = async (req, res) => {
        const transaction = await sequelize.transaction();
        try {
            const rating = await models.Rating.create(
                {
                    ...req.body.rating,
                    user_id: req.session.user_id,
                },
                {
                    transaction,
                }
            );

            const userRatings = await models.UsersCalifications.create(
                {
                    rating_id: rating.rating_id,
                    user_id: req.params.id,
                },
                {
                    transaction,
                }
            );

            await transaction.commit();

            res.status(200).json({
                success: true,
                message: "Calificación creada correctamente.",
                data: rating,
            });
        } catch (error) {
            await transaction.rollback();

            res.status(404).json({
                success: false,
                message: error.message,
            });
        }
    };

    static createProductRating = async (req, res) => {
        const transaction = await sequelize.transaction();
        try {
            const rating = await models.Rating.create(
                {
                    ...req.body.rating,
                    user_id: req.session.user_id,
                },
                {
                    transaction,
                }
            );

            const productRatings = await models.ProductsCalifications.create(
                {
                    rating_id: rating.rating_id,
                    product_id: req.params.id,
                },
                {
                    transaction,
                }
            );

            await transaction.commit();

            res.status(200).json({
                success: true,
                message: "Calificación creada correctamente.",
                data: rating,
            });
        } catch (error) {
            await transaction.rollback();

            res.status(404).json({
                success: false,
                message: error.message,
            });
        }
    };

    static updateRating = async (req, res) => {
        try {
            const rating = await models.Rating.update(req.body.rating, {
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
