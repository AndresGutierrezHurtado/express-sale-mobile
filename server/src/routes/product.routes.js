import { Router } from "express";
import ProductController from "../controllers/productController.js";

const productRoutes = Router();

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un producto
 *     tags:
 *        - Productos
 *     description: Crea un nuevo producto en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_image:
 *                 type: string
 *                 example: "base64imageencoded"
 *               product:
 *                 type: object
 *                 properties:
 *                   product_name:
 *                     type: string
 *                   product_description:
 *                     type: string
 *                   product_quantity:
 *                     type: number
 *                   product_price:
 *                     type: number
 *                   product_status:
 *                     type: string
 *                     example: "publico || privado"
 *     responses:
 *       200:
 *         description: Producto creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Producto creado correctamente."
 *                 data:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: string
 *                     product_name:
 *                       type: string
 *                     product_description:
 *                       type: string
 *                     product_quantity:
 *                       type: number
 *                     product_price:
 *                       type: number
 *                     product_image_url:
 *                       type: string
 *                     product_status:
 *                       type: string
 *                       example: "publico || privado"
 *                     product_date:
 *                       type: string
 *                       example: "2024-10-13T14:31:52.000Z"
 *                     user_id:
 *                       type: string
 *                     category_id:
 *                       type: number
 *       500:
 *         description: Error en la creación del producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error en la creación del producto."
 *                 data:
 *                   type: object
 *                   properties: {}
 */
productRoutes.post("/products", ProductController.createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener lista de productos
 *     tags:
 *       - Productos
 *     description: Retorna un listado de productos disponibles.
 *     parameters:
 *       - in: query
 *         name: limit
 *         description: Límite de productos por página
 *         schema:
 *           type: integer
 *         required: false
 *       - in: query
 *         name: page
 *         description: Número de página para paginación
 *         schema:
 *           type: integer
 *         required: false
 *       - in: query
 *         name: search
 *         description: Criterio de búsqueda por nombre, descripción o categoría
 *         schema:
 *           type: string
 *         required: false
 *       - in: query
 *         name: sort
 *         description: Ordenar por campo y orden separados por dos puntos (e.g., product_name:asc)
 *         schema:
 *           type: string
 *         required: false
 *       - in: query
 *         name: min
 *         description: Filtro por precio mínimo
 *         schema:
 *           type: number
 *         required: false
 *       - in: query
 *         name: max
 *         description: Filtro por precio máximo
 *         schema:
 *           type: number
 *         required: false
 *       - in: query
 *         name: category_id
 *         description: Filtro por categoría
 *         schema:
 *           type: string
 *         required: false
 *     responses:
 *       200:
 *         description: Listado de productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Productos obtenidos correctamente."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product_id:
 *                         type: string
 *                       product_name:
 *                         type: string
 *                       product_description:
 *                         type: string
 *                       product_quantity:
 *                         type: number
 *                       product_price:
 *                         type: number
 *                       product_image_url:
 *                         type: string
 *                       product_date:
 *                         type: string
 *                       category_id:
 *                         type: number
 *                       user_id:
 *                         type: string
 *                       average_rating:
 *                         type: number
 *                       ratings_count:
 *                         type: number
 *                       category:
 *                         type: object
 *                         properties:
 *                           category_id:
 *                             type: number
 *                           category_name:
 *                             type: string
 *                       user:
 *                         type: object
 *                         properties:
 *                           user_id:
 *                             type: string
 *                           user_name:
 *                             type: string
 *                           user_lastname:
 *                             type: string
 *                           user_email:
 *                             type: string
 *                           user_alias:
 *                             type: string
 *                           user_phone:
 *                             type: number
 *                           user_address:
 *                             type: string
 *                           user_image_url:
 *                             type: string
 *       500:
 *         description: Error al obtener productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error al obtener productos."
 *                 data:
 *                   type: object
 *                   properties: {}
 */
productRoutes.get("/products", ProductController.getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto
 *     tags:
 *       - Productos
 *     description: Retorna la información de un producto específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información del producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Producto obtenido correctamente."
 *                 data:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: string
 *                     product_name:
 *                       type: string
 *                     product_description:
 *                       type: string
 *                     product_quantity:
 *                       type: number
 *                     product_price:
 *                       type: number
 *                     product_image_url:
 *                       type: string
 *                     product_date:
 *                       type: string
 *                     category_id:
 *                       type: number
 *                     user_id:
 *                       type: string
 *                     average_rating:
 *                       type: number
 *                     ratings_count:
 *                       type: number
 *                     category:
 *                       type: object
 *                       properties:
 *                         category_id:
 *                           type: number
 *                         category_name:
 *                           type: string
 *                     user:
 *                       type: object
 *                       properties:
 *                         user_id:
 *                           type: string
 *                         user_name:
 *                           type: string
 *                         user_lastname:
 *                           type: string
 *                         user_email:
 *                           type: string
 *                         user_alias:
 *                           type: string
 *                         user_phone:
 *                           type: number
 *                         user_address:
 *                           type: string
 *                         user_image_url:
 *                           type: string
 *                         worker:
 *                           type: object
 *                           properties:
 *                             worker_id:
 *                               type: string
 *                             worker_description:
 *                               type: string
 *                             worker_balance:
 *                               type: number
 *                             user_id:
 *                               type: string
 *                     media:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           media_id:
 *                             type: string
 *                           media_url:
 *                             type: string
 *                           product_id:
 *                             type: string
 *       500:
 *         description: Error al obtener el producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error al obtener el producto."
 *                 data:
 *                   type: object
 *                   properties: {}
 */
productRoutes.get("/products/:id", ProductController.getProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     tags:
 *       - Productos
 *     description: Actualiza la información de un producto específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_image:
 *                 type: string
 *                 example: "base64imageencoded"
 *               product_medias:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "base64imageencoded"
 *               product:
 *                 type: object
 *                 properties:
 *                   product_name:
 *                     type: string
 *                   product_description:
 *                     type: string
 *                   product_quantity:
 *                     type: number
 *                   product_price:
 *                     type: number
 *                   product_status:
 *                     type: string
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Producto actualizado correctamente."
 *                 data:
 *                   type: object
 *                   properties: {}
 *       500:
 *         description: Error al actualizar el producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error al actualizar el producto."
 *                 data:
 *                   type: object
 *                   properties: {}
 */
productRoutes.put("/products/:id", ProductController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags:
 *       - Productos
 *     description: Elimina un producto de la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Producto eliminado correctamente."
 *                 data:
 *                   type: number
 *                   example: 1
 *       500:
 *         description: Error al eliminar el producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error al eliminar el producto."
 *                 data:
 *                   type: object
 *                   properties: {}
 */
productRoutes.delete("/products/:id", ProductController.deleteProduct);

/**
 * @swagger
 * /products/{id}/ratings:
 *   get:
 *     summary: Obtener calificaciones de un producto
 *     tags:
 *       - Productos
 *     description: Retorna las calificaciones de un producto específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Listado de calificaciones del producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Calificaciones obtenidas correctamente."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       rating_id:
 *                         type: string
 *                       rating_value:
 *                         type: number
 *                       rating_date:
 *                         type: string
 *                         example: "2024-10-13T14:31:52.000Z"
 *                       rating_comment:
 *                         type: string
 *       500:
 *         description: Error al obtener las calificaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error al obtener las calificaciones."
 *                 data:
 *                   type: object
 *                   properties: {}
 */
productRoutes.get("/products/:id/ratings", ProductController.getProductRatings);

/**
 * @swagger
 * /medias/{id}:
 *   delete:
 *     summary: Eliminar multimedia de un producto
 *     tags:
 *       - Productos
 *     description: Elimina un archivo multimedia asociado a un producto.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la multimedia
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Imagenes eliminadas correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Imagenes eliminadas correctamente."
 *                 data:
 *                   type: number
 *                   example: 4
 *       500:
 *         description: Error al eliminar las multimedia.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error al eliminar las multimedia."
 *                 data:
 *                   type: object
 *                   properties: {}
 */
productRoutes.delete("/medias/:id", ProductController.deleteMultimedia);

export default productRoutes;
