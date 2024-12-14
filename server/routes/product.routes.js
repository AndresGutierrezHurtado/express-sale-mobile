import { Router } from "express";
import ProductController from "../controllers/productController.js";
import { pdfGenerator } from "../utils/pdfGenerator.js";

const productRoutes = Router();

productRoutes.get("/products", ProductController.getProducts);
productRoutes.get("/products/:id", ProductController.getProduct);
productRoutes.post("/products", ProductController.createProduct);
productRoutes.put("/products/:id", ProductController.updateProduct);
productRoutes.delete("/products/:id", ProductController.deleteProduct);
productRoutes.delete("/medias/:id", ProductController.deleteMedia);

productRoutes.get("/pdf/list", pdfGenerator);

export default productRoutes;
