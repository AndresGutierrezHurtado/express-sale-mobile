import * as models from "../models/relations.js";
import sequelize from "../config/database.js";
import { Op } from "sequelize";
import crypto from "crypto";
import { deleteFile, uploadFile } from "../config/uploadImage.js";

export default class ProductController {
    static createProduct = async (req, res) => {
        try {
            let productData = {
                producto_id: crypto.randomUUID(),
                usuario_id: req.session.usuario_id,
                ...req.body.product,
            };
            const product = await models.Product.create(productData);

            if (req.body.producto_imagen) {
                const response = await uploadFile(
                    req.body.producto_imagen,
                    product.producto_id,
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
                        producto_imagen_url: response.data.secure_url || response.data.url,
                    },
                    {
                        where: {
                            producto_id: product.producto_id,
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
            if (req.body.producto_imagen) {
                const response = await uploadFile(
                    req.body.producto_imagen,
                    req.params.id,
                    "/products"
                );
                if (response.success)
                    productData.producto_imagen_url = response.data.secure_url || response.data.url;
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
                            multimedia_id: multimediaId,
                            multimedia_url: response.data.secure_url || response.data.url,
                            producto_id: req.params.id,
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
                    producto_id: req.params.id,
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
                    producto_id: req.params.id,
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
                            producto_estado: "publico",
                        },
                        {
                            [Op.or]: [
                                {
                                    producto_nombre: {
                                        [Op.like]: `%${req.query.search || ""}%`,
                                    },
                                },
                                {
                                    producto_descripcion: {
                                        [Op.like]: `%${req.query.search || ""}%`,
                                    },
                                },
                            ],
                        },
                        {
                            producto_precio: {
                                [Op.gte]: req.query.min || 0,
                            },
                        },
                        {
                            producto_precio: {
                                [Op.lte]: req.query.max || 9999999999,
                            },
                        },
                        {
                            categoria_id: {
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
                order: [
                    [
                        req.query.sort
                            ? req.query.sort.split(":")[0]
                            : sequelize.literal("`calificacion_promedio`"),
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
                include: [
                    "category",
                    "media",
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
                    multimedia_id: req.params.id,
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
