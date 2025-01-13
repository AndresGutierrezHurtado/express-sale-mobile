import * as models from "../models/index.js";
import sequelize from "../configs/database.js";
import { Op } from "sequelize";
import crypto from "crypto";
import { deleteFile, uploadFile } from "../configs/uploadImage.js";

export default class ProductController {
    static createProduct = async (req, res) => {
        try {
            const productId = crypto.randomUUID();

            if (req.body.product_image) {
                const response = await uploadFile(req.body.product_image, productId, "/products");

                req.body.product.product_image_url = response.data;

                if (!response.success)
                    return res.status(500).json({
                        success: false,
                        message: response.message || "Error al subir a la nube la imagen",
                        data: null,
                    });
            }

            const product = await models.Product.create({
                ...req.body.product,
                product_id: productId,
                user_id: req.session.user_id,
            });

            res.status(200).json({
                success: true,
                message: "Producto creado correctamente",
                data: product,
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message,
            });
        }
    };

    static updateProduct = async (req, res) => {
        try {
            const transaction = await sequelize.transaction();

            if (req.body.product_image) {
                const response = await uploadFile(
                    req.body.product_image,
                    req.params.id,
                    "/products"
                );

                if (response.success) req.body.product.product_image_url = response.data;
                else {
                    await transaction.rollback();
                    return res.status(500).json({
                        success: false,
                        message: response.message || "Error al subir la imagen",
                        data: null,
                    });
                }
            }

            if (req.body.product_medias.length > 0) {
                for (const multimedia of req.body.product_medias) {
                    const multimediaId = crypto.randomUUID();

                    const response = await uploadFile(
                        multimedia,
                        multimediaId,
                        "/products/multimedia"
                    );

                    if (response.success)
                        await models.Media.create(
                            {
                                media_id: multimediaId,
                                media_url: response.data,
                                product_id: req.params.id,
                            },
                            { transaction }
                        );
                    else {
                        await transaction.rollback();
                        return res.status(500).json({
                            success: false,
                            message: response.message || "Error al subir la imagen",
                            data: null,
                        });
                    }
                }
            }

            const product = await models.Product.update(req.body.product, {
                where: {
                    product_id: req.params.id,
                },
                transaction,
            });

            await transaction.commit();
            res.status(200).json({
                success: true,
                message: "Producto actualizado correctamente",
                data: product,
            });
        } catch (error) {
            await transaction.rollback();
            console.log(error);

            res.status(404).json({
                success: false,
                message: error.message,
            });
        }
    };

    static deleteProduct = async (req, res) => {
        try {
            const product = await models.Product.destroy({
                where: {
                    product_id: req.params.id,
                },
            });

            res.status(200).json({
                success: true,
                message: "Producto eliminado correctamente",
                data: product,
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message,
            });
        }
    };

    static getProducts = async (req, res) => {
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
                            {
                                "$user.user_name$": {
                                    [Op.like]: `%${req.query.search || ""}%`,
                                },
                            },
                            {
                                "$user.user_lastname$": {
                                    [Op.like]: `%${req.query.search || ""}%`,
                                },
                            },
                            {
                                "$user.user_alias$": {
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
                include: [
                    "category",
                    {
                        model: models.User,
                        as: "user",
                    },
                ],
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
                            "ratings_count",
                        ],
                    ],
                },
                where,
                limit,
                offset,
                distinct: true,
                order: [order],
            });

            res.status(200).json({
                success: true,
                message: "Listado de productos.",
                data: { ...products, limit, page, offset },
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static getProduct = async (req, res) => {
        try {
            const product = await models.Product.findByPk(req.params.id, {
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
                            "ratings_count",
                        ],
                    ],
                },
                include: [
                    "category",
                    "medias",
                    { model: models.User, as: "user", include: ["worker"] },
                ],
            });

            res.status(200).json({
                success: true,
                message: "Listado de productos.",
                data: product,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    };

    static getProductRatings = async (req, res) => {
        try {
            const { ratings } = await models.Product.findByPk(req.params.id, {
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
                message: "Listado de productos.",
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

    static deleteMultimedia = async (req, res) => {
        const transaction = await sequelize.transaction();

        try {
            await models.Media.destroy({
                where: {
                    media_id: req.params.id,
                },
                transaction,
            });

            const response = await deleteFile(`express-sale/products/multimedia/${req.params.id}`);

            if (!response || !response.success) {
                throw new Error(response.message);
            }

            await transaction.commit();

            res.status(200).json({
                success: true,
                message: "Imagen eliminada correctamente",
                data: null,
            });
        } catch (error) {
            await transaction.rollback();

            res.status(404).json({
                success: false,
                message: error.message,
            });
        }
    };
}
