import { Router } from "express";
import ProductController from "../controllers/productController.js";

const productRoutes = Router();

productRoutes.post("/products", ProductController.createProduct);
productRoutes.get("/products", ProductController.getProducts);
productRoutes.get("/products/:id", ProductController.getProduct);
productRoutes.put("/products/:id", ProductController.updateProduct);
productRoutes.delete("/products/:id", ProductController.deleteProduct);
productRoutes.get("/products/:id/ratings", ProductController.getProductRatings);
productRoutes.delete("/multimedias/:id", ProductController.deleteMultimedia);

export default productRoutes;