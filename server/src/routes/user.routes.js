import { Router } from "express";
import UserController from "../controllers/userController.js";

const userRoutes = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Agregar un nuevo usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   user_name:
 *                     type: string
 *                     example: John Doe
 *                   user_lastname:
 *                     type: string
 *                     example: Doe
 *                   user_alias:
 *                     type: string
 *                     example: johndoe
 *                   user_email:
 *                     type: string
 *                     example: johndoe@example.com
 *                   user_phone:
 *                     type: number
 *                     example: 1234567890
 *                   user_address:
 *                     type: string
 *                     example: 123 Main St, Anytown, USA 12345
 *                   user_image:
 *                     type: string
 *                     format: binary
 *                 required:
 *                   - user_name
 *                   - user_lastname
 *                   - user_alias
 *                   - user_email
 *                   - user_phone
 *                   - user_address
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
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
 *                   example: "Usuario creado exitosamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: string
 *                     user_name:
 *                       type: string
 *                     user_lastname:
 *                       type: string
 *                     user_alias:
 *                       type: string
 *                     user_email:
 *                       type: string
 *                     user_phone:
 *                       type: number
 *                     user_address:
 *                       type: string
 *                     user_image_url:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                     updated_at:
 *                       type: string
 *       500:
 *         description: Error al crear el usuario
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
 *                   example: "Error al crear el usuario"
 *                 data:
 *                   type: object
 */
userRoutes.post("/users", UserController.createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener lista de usuarios
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Criterio de búsqueda por nombre, alias o email
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Ordenar por campo (e.g., user_name, user_email)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número de usuarios a devolver
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página para paginación
 *     responses:
 *       200:
 *         description: lista de usuarios
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
 *                   example: "Usuarios obtenidos correctamente"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user_id:
 *                         type: string
 *                       user_name:
 *                         type: string
 *                       user_lastname:
 *                         type: string
 *                       user_alias:
 *                         type: string
 *                       user_email:
 *                         type: string
 *                       user_phone:
 *                         type: number
 *                       user_address:
 *                         type: string
 *                       user_image_url:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                       updated_at:
 *                         type: string
 *                       worker:
 *                         type: object
 *                         properties:
 *                           worker_id:
 *                             type: string
 *                           worker_description:
 *                             type: string
 *                           worker_balance:
 *                             type: number
 *                       role:
 *                         type: object
 *                         properties:
 *                           role_id:
 *                             type: integer
 *                           role_name:
 *                             type: string
 *       500:
 *         description: Error al obtener la lista de usuarios
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
 *                   example: "Error al obtener la lista de usuarios"
 *                 data:
 *                   type: object
 *                   properties: {}
 */
userRoutes.get("/users", UserController.getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por su ID
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente
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
 *                   example: "Usuario obtenido correctamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: string
 *                     user_name:
 *                       type: string
 *                     user_lastname:
 *                       type: string
 *                     user_alias:
 *                       type: string
 *                     user_email:
 *                       type: string
 *                     user_phone:
 *                       type: number
 *                     user_address:
 *                       type: string
 *                     user_image_url:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                     updated_at:
 *                       type: string
 *                     worker:
 *                       type: object
 *                       properties:
 *                         worker_id:
 *                           type: string
 *                         worker_description:
 *                           type: string
 *                         worker_balance:
 *                           type: number
 *                     role:
 *                       type: object
 *                       properties:
 *                         role_id:
 *                           type: integer
 *                         role_name:
 *                           type: string
 *       404:
 *         description: Usuario no encontrado
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
 *                   example: "Usuario no encontrado"
 *                 data:
 *                   type: object
 *                   properties: {}
 *       500:
 *         description: Error al obtener el usuario
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
 *                   example: "Error al obtener el usuario"
 *                 data:
 *                   type: object
 */
userRoutes.get("/users/:id", UserController.getUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar información de un usuario
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   user_name:
 *                     type: string
 *                   user_lastname:
 *                     type: string
 *                   user_alias:
 *                     type: string
 *                   user_email:
 *                     type: string
 *                   user_phone:
 *                     type: number
 *                   user_address:
 *                     type: string
 *                   user_password:
 *                     type: string
 *                   role_id:
 *                     type: integer
 *               worker:
 *                 type: object
 *                 properties:
 *                   worker_description:
 *                     type: string
 *                   worker_balance:
 *                     type: number
 *               user_image:
 *                 type: string
 *                 format: byte
 *                 example: "base64encodedimage"
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
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
 *                   example: "Usuario actualizado correctamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: string
 *                     user_name:
 *                       type: string
 *                     user_lastname:
 *                       type: string
 *                     user_alias:
 *                       type: string
 *                     user_email:
 *                       type: string
 *                     user_phone:
 *                       type: number
 *                     user_address:
 *                       type: string
 *                     user_image_url:
 *                       type: string
 *                     role_id:
 *                       type: integer
 *                     role:
 *                       type: object
 *                       properties:
 *                         role_id:
 *                           type: integer
 *                         role_name:
 *                           type: string
 *       404:
 *         description: Usuario no encontrado
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
 *                   example: "Usuario no encontrado"
 *                 data:
 *                   type: object
 *                   properties: {}
 *       500:
 *         description: Error al actualizar el usuario
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
 *                   example: "Error al actualizar el usuario"
 *                 data:
 *                   type: object
 *                   properties: {}
 */
userRoutes.put("/users/:id", UserController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar un usuario por su ID
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
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
 *                   example: "Usuario eliminado correctamente"
 *       404:
 *         description: Usuario no encontrado
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
 *                   example: "Usuario no encontrado"
 *                 data:
 *                   type: object
 *                   properties: {}
 *       500:
 *         description: Error al eliminar el usuario
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
 *                   example: "Error al eliminar el usuario"
 *                 data:
 *                   type: object
 *                   properties: {}
 */
userRoutes.delete("/users/:id", UserController.deleteUser);

// Extra info

/**
 * @swagger
 * /users/{id}/products:
 *   get:
 *     summary: Obtener productos de un usuario
 *     tags:
 *       - Detalles de Usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del usuario
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Criterio de búsqueda por nombre, alias o email
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: user_name:asc
 *         description: Ordenar por campo, el primer argumento es el campo y el segundo es el orden (asc o desc) separados por dos puntos
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Número de usuarios a devolver
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Número de página para paginación
 *     responses:
 *       200:
 *         description: Productos obtenidos correctamente
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
 *                   example: "Productos obtenidos correctamente"
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
 *                       product_price:
 *                         type: number
 *                       product_image_url:
 *                         type: string
 *                       product_date:
 *                         type: string
 *                       product_quantity:
 *                         type: number
 *                       category_id:
 *                         type: number
 *                       category:
 *                         type: object
 *                         properties:
 *                           category_id:
 *                             type: number
 *                           category_name:
 *                             type: string
 *       500:
 *         description: Error al obtener los productos
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
 *                   example: "Error al obtener los productos"
 *                 data:
 *                   type: object
 *                   properties: {}
 */
userRoutes.get("/users/:id/products", UserController.getUserProducts);

/**
 * @swagger
 * /users/{id}/orders:
 *   get:
 *     summary: Obtener pedidos hechos por un usuario
 *     tags:
 *       - Detalles de Usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del usuario
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
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Pedidos obtenidos correctamente"
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
 *                       order_status:
 *                         type: string
 *                       paymentDetails:
 *                         type: object
 *                         properties:
 *                           payment_id:
 *                             type: string
 *                           order_id:
 *                             type: string
 *                           payu_reference:
 *                             type: string
 *                           payment_method:
 *                             type: string
 *                           payment_amount:
 *                             type: number
 *                           buyer_name:
 *                             type: string
 *                           buyer_email:
 *                             type: string
 *                           buyer_document_type:
 *                             type: string
 *                           buyer_document_number:
 *                             type: number
 *                           buyer_phone:
 *                             type: number
 *                       shippingDetails:
 *                         type: object
 *                         properties:
 *                           shipping_id:
 *                             type: string
 *                           order_id:
 *                             type: string
 *                           worker_id:
 *                             type: string
 *                           shipping_address:
 *                             type: string
 *                           shipping_reference:
 *                             type: string
 *                           shipping_coordinates:
 *                             type: string
 *                             example: "{lat: x, lng: x}"
 *                           shipping_start:
 *                             type: string
 *                           shipping_end:
 *                             type: string
 *                           shipping_cost:
 *                             type: number
 *                           shipping_message:
 *                             type: string
 *                       orderProducts:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             order_id:
 *                               type: string
 *                             product_id:
 *                               type: string
 *                             product_price:
 *                               type: number
 *                             product_quantity:
 *                               type: number
 *                             product:
 *                               type: object
 *                               properties:
 *                                 product_id:
 *                                   type: string
 *                                 product_name:
 *                                   type: string
 *                                 product_description:
 *                                   type: string
 *                                 product_price:
 *                                   type: number
 *                                 product_image_url:
 *                                   type: string
 *                                 product_date:
 *                                   type: string
 *                                 product_quantity:
 *                                   type: number
 *                                 category_id:
 *                                   type: number
 *                                 user_id:
 *                                   type: string
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
userRoutes.get("/users/:id/orders", UserController.getUserOrders);

/**
 * @swagger
 * /users/{id}/ratings:
 *   get:
 *     summary: Obtener calificaciones de un usuario
 *     tags:
 *       - Detalles de Usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del usuario
 *     responses:
 *       200:
 *         description: Calificaciones obtenidas correctamente
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
 *                   example: "Calificaciones obtenidas correctamente"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       rating_id:
 *                         type: string
 *                       rating_comment:
 *                         type: string
 *                       rating_image_url:
 *                         type: string
 *                       rating_value:
 *                         type: number
 *                       rating_date:
 *                         type: string
 *                       user_id:
 *                         type: string
 *                       calificator:
 *                         type: object
 *                         properties:
 *                           user_id:
 *                             type: string
 *                           user_name:
 *                             type: string
 *                           user_lastname:
 *                             type: string
 *                           user_alias:
 *                             type: string
 *                           user_email:
 *                             type: string
 *                           user_phone:
 *                             type: number
 *                           user_address:
 *                             type: string
 *                           user_image_url:
 *                             type: string
 *       500:
 *         description: Error al obtener las calificaciones
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
 *                   example: "Error al obtener las calificaciones"
 *                 data:
 *                   type: object
 *                   properties: {}
 */
userRoutes.get("/users/:id/ratings", UserController.getUserRatings);

/**
 * @swagger
 * /feedback:
 *   post:
 *     summary: Enviar mensaje de feedback a el administrador via email
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email_subject:
 *                 type: string
 *               email_message:
 *                 type: string
 *               user_name:
 *                 type: string
 *               user_email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notificación de feedback enviada correctamente
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
 *                   example: "Mensaje de feedback enviado correctamente"
 *                 data:
 *                   type: object
 *                   properties: {}
 *       500:
 *         description: Error al enviar el mensaje de feedback
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
 *                   example: "Error al enviar el mensaje de feedback"
 *                 data:
 *                   type: object
 *                   properties: {}
 */
userRoutes.post("/feedback", UserController.createUserFeedback);

// Withdrawals
/**
 * @swagger
 * /users/{id}/withdrawals:
 *   get:
 *     summary: Obtener retiros/ingresos de un usuario
 *     tags:
 *       - Detalles de Usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del usuario
 *     responses:
 *       200:
 *         description: Retiros obtenidos correctamente
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
 *                   example: "Retiros obtenidos correctamente"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       date:
 *                         type: string
 *                         example: "2023-01-01T00:00:00.000Z"
 *                       type:
 *                         type: string
 *                         example: "ingreso || retiro"
 *       404:
 *         description: Usuario no encontrado
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
 *                   example: "Usuario no encontrado"
 *                 data:
 *                   type: object
 *                   properties: {}
 *       500:
 *         description: Error al obtener los retiros
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
 *                   example: "Error al obtener los retiros"
 *                 data:
 *                   type: object
 *                   properties: {}
 */
userRoutes.get("/users/:id/withdrawals", UserController.getUserWithdrawals);

/**
 * @swagger
 * /withdrawals:
 *   post:
 *     summary: Realizar un retiro a un usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               withdrawal_amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Retiro creado correctamente
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
 *                   example: "Retiro creado correctamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     withdrawal_id:
 *                       type: string
 *                     worker_id:
 *                       type: string
 *                     withdrawal_amount:
 *                       type: number
 *                     withdrawal_date:
 *                       type: string
 *                       example: "2023-01-01T00:00:00.000Z"
 *       500:
 *         description: Error al crear el retiro
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
 *                   example: "Error al crear el retiro"
 *                 data:
 *                   type: object
 *                   properties: {}
 */
userRoutes.post("/withdrawals", UserController.createUserWithdrawal);

// Cart
/**
 * @swagger
 * /users/{id}/cart:
 *   get:
 *     summary: Obtener el carrito de un usuario
 *     tags:
 *       - Carrito
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del usuario
 *     responses:
 *       200:
 *         description: Carrito obtenido correctamente
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
 *                       cart_id:
 *                         type: string
 *                       user_id:
 *                         type: string
 *                       product_id:
 *                         type: string
 *                       product_quantity:
 *                         type: number
 *                       product:
 *                         type: object
 *                         properties:
 *                           product_id:
 *                             type: string
 *                           product_name:
 *                             type: string
 *                           product_description:
 *                             type: string
 *                           product_quantity:
 *                             type: number
 *                           product_price:
 *                             type: number
 *                           product_image_url:
 *                             type: string
 *                           product_status:
 *                             type: string
 *                             example: "publico || privado"
 *                           product_date:
 *                             type: string
 *                             example: "2024-10-13T14:31:52.000Z"
 *                           user_id:
 *                             type: string
 *                           category_id:
 *                             type: number
 *       500:
 *         description: Error al obtener el carrito
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
 *                   example: "Error al obtener el carrito"
 *                 data:
 *                   type: object
 *                   properties: {}
 */
userRoutes.get("/users/:id/carts", UserController.getUserCart);

/**
 * @swagger
 * /users/{id}/carts:
 *   post:
 *     summary: Agregar un producto al carrito de un usuario
 *     tags:
 *       - Carrito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto agregado al carrito correctamente
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
 *                   type: object
 *                   properties:
 *                     cart_id:
 *                       type: string
 *                     user_id:
 *                       type: string
 *                     product_id:
 *                       type: string
 *                     product_quantity:
 *                       type: number
 *       500:
 *         description: Error al agregar el producto al carrito
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
 *                   example: "Error al agregar el producto al carrito"
 *                 data:
 *                   type: object
 *                   properties: {}
 */
userRoutes.post("/carts", UserController.createUserCart);

/**
 * @swagger
 * /carts/{id}:
 *   put:
 *     summary: Actualizar un producto en el carrito de un usuario
 *     tags:
 *       - Carrito
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Carrito actualizado correctamente
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
 *                     type: number
 *                     example: [1]
 *       500:
 *         description: Error al actualizar el carrito
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
 *                   example: "Error al actualizar el carrito"
 *                 data:
 *                   type: object
 *                   properties: {}
 */
userRoutes.put("/carts/:id", UserController.updateUserCart);

/**
 * @swagger
 * /carts/{id}:
 *   delete:
 *     summary: Eliminar un producto del carrito de un usuario
 *     tags:
 *       - Carrito
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del carrito
 *     responses:
 *       200:
 *         description: Producto eliminado del carrito correctamente
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
 *                   example: "Producto eliminado del carrito correctamente"
 *                 data:
 *                   type: number
 *                   example: 1
 *       500:
 *         description: Error al eliminar el producto del carrito
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
 *                   example: "Error al eliminar el producto del carrito"
 *                 data:
 *                   type: object
 *                   properties: {}
 */
userRoutes.delete("/carts/:id", UserController.deleteUserCart);

/**
 * @swagger
 * /carts/empty:
 *   delete:
 *     summary: Vaciar el carrito de un usuario
 *     tags:
 *       - Carrito
 *     responses:
 *       200:
 *         description: Carrito vaciado correctamente
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
 *                   example: "Carrito vaciado correctamente"
 *                 data:
 *                   type: number
 *                   example: 4
 *       500:
 *         description: Error al vaciar el carrito
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
 *                   example: "Error al vaciar el carrito"
 *                 data:
 *                   type: object
 *                   properties: {}
 */
userRoutes.delete("/carts/empty", UserController.emptyUserCart);

// Recovery

/**
 * @swagger
 * /users/recoveries:
 *   post:
 *     summary: Enviar email de recuperación de contrase a
 *     tags:
 *       - Recuperación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_email:
 *                 type: string
 *                 example: "ejemplo@gmail.com"
 *     responses:
 *       200:
 *         description: Email de recuperación de contrase a enviado correctamente
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
 *                   example: "Email de recuperación de contraseña enviado correctamente"
 *                 data:
 *                   type: object
 *                   properties: {}
 *       404:
 *         description: Usuario no encontrado
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
 *                   example: "Usuario no encontrado"
 *                 data:
 *                   type: object
 *                   properties: {}
 *       500:
 *         description: Error al enviar el email de recuperaci n de contrase a
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
 *                   example: "Error al enviar el email de recuperaci n de contrase a"
 *                 data:
 *                   type: object
 *                   properties: {}
 */
userRoutes.post("/recoveries", UserController.createRecovery);

/**
 * @swagger
 * /users/recoveries/{token}:
 *   get:
 *     summary: Verificar si el token de recuperaci n de contrase a es v lido
 *     tags:
 *       - Recuperación
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de recuperaci n de contrase a
 *     responses:
 *       200:
 *         description: Token de recuperaci n de contrase a v lido
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
 *                   example: "Token de recuperaci n de contrase a v lido"
 *                 data:
 *                   type: object
 *                   properties: {}
 *       404:
 *         description: Token de recuperaci n de contrase a no encontrado
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
 *                   example: "Token de recuperaci n de contrase a no encontrado"
 *                 data:
 *                   type: object
 *                   properties: {}
 *       401:
 *         description: Token de recuperaci n de contrase a inv lido
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
 *                   example: "Token de recuperaci n de contrase a inv lido/expirado"
 *                 data:
 *                   type: object
 *                   properties: {}
 *       500:
 *         description: Error al verificar el token de recuperaci n de contrase a
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
 *                   example: "Error al verificar el token de recuperaci n de contrase a"
 *                 data:
 *                   type: object
 *                   properties: {}
 */
userRoutes.get("/recoveries/:token", UserController.getRecovery);

/**
 * @swagger
 * /users/recoveries/{token}:
 *   put:
 *     summary: Actualizar la contrase a de un usuario con el token de recuperaci n
 *     tags:
 *       - Recuperación
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de recuperaci n de contrase a
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_password:
 *                 type: string
 *                 example: password123
 *               user_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contrase a actualizada correctamente
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
 *                   example: "Contrase a actualizada correctamente"
 *                 data:
 *                   type: object
 *                   properties: {}
 *       500:
 *         description: Error al actualizar la contrase a con el token de recuperaci n
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
 *                   example: "Error al actualizar la contrase a con el token de recuperaci n"
 *                 data:
 *                   type: object
 *                   properties: {}
 */
userRoutes.put("/recoveries/:token", UserController.updateRecovery);

export default userRoutes;
