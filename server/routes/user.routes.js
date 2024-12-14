import { Router } from "express";
import userController from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.get("/users", userController.getUsers);
userRoutes.get("/users/:id", userController.getUser);
userRoutes.post("/users", userController.createUser);
userRoutes.put("/users/:id", userController.updateUser);
userRoutes.delete("/users/:id", userController.deleteUser)

// auth routes
userRoutes.get("/user/session", userController.verifyUserSession);
userRoutes.post("/user/login", userController.authUser);
userRoutes.post("/user/logout", userController.logoutUser);

// user Feedback routes
userRoutes.post("/user/feedback", userController.sendFeedback);

export default userRoutes;