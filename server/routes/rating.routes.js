import { Router } from "express";
import RatingController from "../controllers/ratingController.js";

const ratingRoutes = Router();

ratingRoutes.post("/ratings/users/:id", RatingController.createUserRating);
ratingRoutes.post("/ratings/products/:id", RatingController.createProductRating);
ratingRoutes.put("/ratings/:id", RatingController.updateRating);
ratingRoutes.delete("/ratings/:id", RatingController.deleteRating);

export default ratingRoutes;