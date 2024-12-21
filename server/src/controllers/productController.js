import * as models from "../models/index.js";
import sequelize from "../configs/database.js";
import { Op } from "sequelize";
import crypto from "crypto";
import { deleteFile, uploadFile } from "../configs/uploadImage.js";

export default class ProductController {
    static createProduct = async (req, res) => {
        try {
            const product = await models.Product.create({
                ...req.body.product,
                user_id: req.session.user_id,
            });

            if (req.body.product_image) {
                const response = await uploadFile(
                    req.body.product_image,
                    product.product_id,
                    "/products"
                );

                if (!response.success)
                    return res.status(500).json({
                        success: false,
                        message: response.message || "Error al subir a la nube la imagen",
                        data: null,
                    });

                const responseUpdate = await models.Product.update(
                    {
                        product_image_url: response.data || response.data,
                    },
                    {
                        where: {
                            product_id: product.product_id,
                        },
                    }
                );

                if (responseUpdate[0] < 1) {
                    return res.status(500).json({
                        success: false,
                        message: responseUpdate.message || "Error al guardar en la nube la imagen",
                        data: null,
                    });
                }
            }

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
            let productData = req.body.product;
            if (req.body.product_image) {
                const response = await uploadFile(
                    req.body.product_image,
                    req.params.id,
                    "/products"
                );
                if (response.success)
                    productData.product_image_url = response.data || response.data.url;
                else
                    return res.status(500).json({
                        success: false,
                        message: response.message || "Error al subir la imagen",
                        data: null,
                    });
            }

            if (req.body.multimedias.length > 0) {
                req.body.multimedias.forEach(async (multimedia) => {
                    const multimediaId = crypto.randomUUID();
                    const response = await uploadFile(
                        multimedia,
                        multimediaId,
                        "/products/multimedia"
                    );

                    if (response.success)
                        await models.Media.create({
                            media_id: multimediaId,
                            media_url: response.data || response.data.url,
                            product_id: req.params.id,
                        });
                    else
                        return res.status(500).json({
                            success: false,
                            message: response.message || "Error al subir la imagen",
                            data: null,
                        });
                });
            }

            const product = await models.Product.update(productData, {
                where: {
                    product_id: req.params.id,
                },
            });
            res.status(200).json({
                success: true,
                message: "Producto actualizado correctamente",
                data: product,
            });
        } catch (error) {
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
            const products = await models.Product.findAndCountAll({
                where: {
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
                                [Op.in]: req.query.category ? [req.query.category] : [1, 2, 3, 4],
                            },
                        },
                    ],
                },
                limit: parseInt(req.query.limit || 5),
                offset: req.query.page ? (req.query.page - 1) * 5 : 0,
                distinct: true,
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
                            "rating_count",
                        ],
                    ],
                },
                order: [
                    [
                        req.query.sort
                            ? req.query.sort.split(":")[0]
                            : sequelize.literal("`average_rating`"),
                        req.query.sort ? req.query.sort.split(":")[1] : "DESC",
                    ],
                ],
            });

            res.status(200).json({
                success: true,
                message: "Listado de productos.",
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
                            "rating_count",
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
        const t = await sequelize.transaction();
        try {
            await models.Media.destroy({
                where: {
                    media_id: req.params.id,
                },
                transaction: t,
            });

            const response = await deleteFile(`express-sale/products/multimedia/${req.params.id}`);

            if (!response || !response.success) {
                throw new Error(response.message);
            }

            await t.commit();
            res.status(200).json({
                success: true,
                message: "Imagen eliminada correctamente",
                data: null,
            });
        } catch (error) {
            await t.rollback();
            res.status(404).json({
                success: false,
                message: error.message,
            });
        }
    };
}
