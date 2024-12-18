import { Router } from "express";
import OrderController from "../controllers/orderController.js";

const orderRoutes = Router();

orderRoutes.get("/payu/callback", OrderController.payuCallback);
orderRoutes.get("/orders", OrderController.getOrders);
orderRoutes.get("/orders/:id", OrderController.getOrder);
orderRoutes.put("/orders/:id", OrderController.updateOrder);

export default orderRoutes;