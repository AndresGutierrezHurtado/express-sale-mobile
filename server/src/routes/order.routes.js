import { Router } from "express";
import OrderController from "../controllers/orderController.js";

const orderRoutes = Router();

orderRoutes.get("/payu/callback", OrderController.payuCallback);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Obtener lista de pedidos
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         description: Obtener los pedidos de un usuario
 *       - in: query
 *         name: order_status
 *         schema:
 *           type: string
 *           example: "pendiente,enviando,entregado,recibido"
 *         description: Obtener los pedidos por estado
 *     responses:
 *       200:
 *         description: Pedidos obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       order_id:
 *                         type: string
 *                       user_id:
 *                         type: string
 *                       order_date:
 *                         type: string
 *                         example: "2023-08-24T12:34:56.789Z"
 *                       order_status:
 *                         type: string
 *                         example: "pendiente || enviando || entregado || recibido"
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
 *                           user_password:
 *                             type: string
 *                           user_date:
 *                             type: string
 *                           user_update:
 *                             type: string
 *                           user_image_url:
 *                             type: string
 *                           role_id:
 *                             type: integer
 *       500:
 *         description: Error al obtener los pedidos
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
 *                   example: "Error al obtener los pedidos"
 *                 data:
 *                   type: object
 *                   properties: {}
 */
orderRoutes.get("/orders", OrderController.getOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Obtener los detalles de un pedido por su identificador
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Identificador del pedido
 *     responses:
 *       200:
 *         description: Pedido obtenido correctamente
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
 *                   example: "Pedido obtenido correctamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     order_id:
 *                       type: string
 *                     user_id:
 *                       type: string
 *                     order_date:
 *                       type: string
 *                       example: "2025-02-05T19:34:35.000Z"
 *                     order_status:
 *                       type: string
 *                       example: "pendiente"
 *                     orderProducts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           order_id:
 *                             type: string
 *                           product_id:
 *                             type: string
 *                           product_price:
 *                             type: string
 *                           product_quantity:
 *                             type: integer
 *                           product:
 *                             type: object
 *                             properties:
 *                               product_id:
 *                                 type: string
 *                               product_name:
 *                                 type: string
 *                               product_description:
 *                                 type: string
 *                               product_quantity:
 *                                 type: integer
 *                               product_price:
 *                                 type: string
 *                               product_image_url:
 *                                 type: string
 *                               product_status:
 *                                 type: string
 *                               product_date:
 *                                 type: string
 *                               user_id:
 *                                 type: string
 *                               category_id:
 *                                 type: integer
 *                               user:
 *                                 type: object
 *                                 properties:
 *                                   user_id:
 *                                     type: string
 *                                   user_name:
 *                                     type: string
 *                                   user_lastname:
 *                                     type: string
 *                                   user_email:
 *                                     type: string
 *                                   user_alias:
 *                                     type: string
 *                                   user_phone:
 *                                     type: string
 *                                   user_address:
 *                                     type: string
 *                                   user_password:
 *                                     type: string
 *                                   user_date:
 *                                     type: string
 *                                   user_update:
 *                                     type: string
 *                                   user_image_url:
 *                                     type: string
 *                                   role_id:
 *                                     type: integer
 *                     shippingDetails:
 *                       type: object
 *                       properties:
 *                         shipping_id:
 *                           type: string
 *                         order_id:
 *                           type: string
 *                         worker_id:
 *                           type: string
 *                           nullable: true
 *                         shipping_address:
 *                           type: string
 *                         shipping_coordinates:
 *                           type: string
 *                         shipping_start:
 *                           type: string
 *                         shipping_end:
 *                           type: string
 *                         shipping_cost:
 *                           type: string
 *                         shipping_message:
 *                           type: string
 *                         worker:
 *                           type: object
 *                           nullable: true
 *                     paymentDetails:
 *                       type: object
 *                       properties:
 *                         payment_id:
 *                           type: string
 *                         order_id:
 *                           type: string
 *                         payu_reference:
 *                           type: string
 *                         payment_method:
 *                           type: string
 *                         payment_amount:
 *                           type: string
 *                         buyer_name:
 *                           type: string
 *                         buyer_email:
 *                           type: string
 *                         buyer_document_type:
 *                           type: string
 *                         buyer_document_number:
 *                           type: string
 *                         buyer_phone:
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
 *                           type: string
 *                         user_address:
 *                           type: string
 *                         user_password:
 *                           type: string
 *                         user_date:
 *                           type: string
 *                         user_update:
 *                           type: string
 *                         user_image_url:
 *                           type: string
 *                         role_id:
 *                           type: integer
 *       404:
 *         description: Pedido no encontrado
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
 *                   example: "Pedido no encontrado"
 *                 data:
 *                   type: object
 *                   properties: {}
 *       500:
 *         description: Error al obtener el pedido
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
 *                   example: "Error al obtener el pedido"
 *                 data:
 *                   type: object
 *                   properties: {}
 */
orderRoutes.get("/orders/:id", OrderController.getOrder);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Actualizar un pedido por su identificador
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Identificador del pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order:
 *                 type: object
 *                 properties:
 *                   order_status:
 *                     type: string
 *                     example: "pendiente || enviando || entregado || recibido"
 *               shippingDetails:
 *                 type: object
 *                 properties:
 *                   shipping_end:
 *                     type: string
 *                     example: "2023-08-24T12:34:56.789Z"
 *                   shipping_cost:
 *                     type: number
 *               delivery:
 *                 type: object
 *                 properties:
 *                   delivery_id:
 *                     type: number
 *                   worker_balance:
 *                     type: string
 *     responses:
 *       200:
 *         description: Pedido actualizado correctamente
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
 *                   example: "Pedido actualizado correctamente"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: number
 *                     example: 1
 * 
 *       500:
 *         description: Error al actualizar el pedido
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
 *                   example: "Error al actualizar el pedido"
 *                 data:
 *                   type: object
 *                   properties: {}
 */
orderRoutes.put("/orders/:id", OrderController.updateOrder);

export default orderRoutes;