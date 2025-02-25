import { Router } from "express";
import RatingController from "../controllers/ratingController.js";

const ratingRoutes = Router();

/**
 * @swagger
 * /ratings/users/{id}:
 *   post:
 *     summary: Crear calificación de usuario
 *     tags:
 *       - Calificación
 *     description: Crea una nueva calificación para un usuario específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario para el que se crea la calificación.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Objeto de calificación que se va a crear.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: object
 *                 properties:
 *                   rating_value:
 *                     type: number
 *                     example: 5
 *                   rating_comment:
 *                     type: string
 *                     example: "Excelente servicio"
 *     responses:
 *       200:
 *         description: Calificación creada correctamente.
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
 *                   example: "Calificación creada correctamente."
 *                 data:
 *                   type: object
 *                   properties:
 *                     rating_id:
 *                       type: string
 *                     rating_value:
 *                       type: number
 *                     rating_comment:
 *                       type: string
 *                     rating_date:
 *                       type: string
 *                       example: "2023-07-05T00:00:00.000Z"
 *                     user_id:
 *                       type: string
 *       500:
 *         description: Error al crear la calificación.
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
 *                   example: "Error al crear la calificación."
 *                 data:
 *                   type: object
 *                   properties: {}
 */
ratingRoutes.post("/ratings/users/:id", RatingController.createUserRating);

/**
 * @swagger
 * /ratings/products/{id}:
 *   post:
 *     summary: Crear calificación de producto
 *     tags:
 *       - Calificación
 *     description: Crea una nueva calificación para un producto específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto para el que se crea la calificación.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Objeto de calificación que se va a crear.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: object
 *                 properties:
 *                   rating_value:
 *                     type: number
 *                     example: 4
 *                   rating_comment:
 *                     type: string
 *                     example: "Producto de buena calidad"
 *     responses:
 *       200:
 *         description: Calificación creada correctamente.
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
 *                   example: "Calificación creada correctamente."
 *                 data:
 *                   type: object
 *                   properties:
 *                     rating_id:
 *                       type: string
 *                     rating_value:
 *                       type: number
 *                     rating_comment:
 *                       type: string
 *                     rating_date:
 *                       type: string
 *                       example: "2023-07-05T00:00:00.000Z"
 *                     user_id:
 *                       type: string
 *       500:
 *         description: Error al crear la calificación.
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
 *                   example: "Error al crear la calificación."
 *                 data:
 *                   type: object
 *                   properties: {}
 */
ratingRoutes.post("/ratings/products/:id", RatingController.createProductRating);

/**
 * @swagger
 * /ratings/{id}:
 *   put:
 *     summary: Actualizar calificación
 *     tags:
 *       - Calificación
 *     description: Actualiza una calificación existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la calificación que se va a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Objeto de calificación con los nuevos valores.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: object
 *                 properties:
 *                   rating_value:
 *                     type: number
 *                     example: 4
 *                   rating_comment:
 *                     type: string
 *                     example: "Actualización del comentario"
 *     responses:
 *       200:
 *         description: Calificación actualizada correctamente.
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
 *                   example: "Calificación actualizada correctamente."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: number
 *                     example: 1
 *       500:
 *         description: Error al actualizar la calificación.
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
 *                   example: "Error al actualizar la calificación."
 *                 data:
 *                   type: object
 *                   properties: {}
 */
ratingRoutes.put("/ratings/:id", RatingController.updateRating);

/**
 * @swagger
 * /ratings/{id}:
 *   delete:
 *     summary: Eliminar calificación
 *     tags:
 *       - Calificación
 *     description: Elimina una calificación existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la calificación que se va a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Calificación eliminada correctamente.
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
 *                   example: "Calificación eliminada correctamente."
 *                 data:
 *                   type: number
 *                   example: 1
 *       404:
 *         description: Error al eliminar la calificación.
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
 *                   example: "Error al eliminar la calificación."
 *                 data:
 *                   type: object
 *                   properties: {}
 */
ratingRoutes.delete("/ratings/:id", RatingController.deleteRating);

export default ratingRoutes;
