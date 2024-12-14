import { Router } from "express";
import UserController from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.post("/users", UserController.createUser);
userRoutes.get("/users", UserController.getUsers);
userRoutes.get("/users/:id", UserController.getUser);
userRoutes.put("/users/:id", UserController.updateUser);
userRoutes.delete("/users/:id", UserController.deleteUser);
userRoutes.get("/users/:id/products", UserController.getUserProducts);
userRoutes.get("/users/:id/orders", UserController.getUserOrders);
userRoutes.get("/users/:id/ratings", UserController.getUserRatings);
userRoutes.post("/feedback", UserController.createUserFeedback);

// Withdrawals
userRoutes.get("/users/:id/withdrawals", UserController.getUserWithdrawals);
userRoutes.post("/withdrawals", UserController.createUserWithdrawal);

// Cart
userRoutes.get("/users/:id/carts", UserController.getUserCart);
userRoutes.post("/carts", UserController.createUserCart);
userRoutes.put("/carts/:id", UserController.updateUserCart);
userRoutes.delete("/carts/:id", UserController.deleteUserCart);
userRoutes.delete("/users/:id/carts/empty", UserController.emptyUserCart);

// Auth
userRoutes.get("/user/session", UserController.verifyUserSession);
userRoutes.post("/user/auth", UserController.authUser);
userRoutes.post("/user/logout", UserController.logoutUser);

// Recovery
userRoutes.post("/recoveries", UserController.createRecovery);
userRoutes.get("/recoveries/:token", UserController.getRecovery);
userRoutes.put("/recoveries/:token", UserController.updateRecovery);

export default userRoutes;
