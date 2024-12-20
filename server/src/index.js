import express from "express";
import cors from "cors";
import session from "express-session";
import * as models from "./models/index.js";

// Routes
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import ratingRoutes from "./routes/rating.routes.js";

const app = express();

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(
    cors({
        origin: process.env.EXPO_PUBLIC_APP_DOMAIN,
        credentials: true,
    })
);
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        // store: ,
        cookie: {
            maxAge: 1000 * 60 * 60,
            httpOnly: process.env.NODE_ENV === "production",
        },
    })
);
app.use(async (req, res, next) => {
    if (req.session.user_id) {
        const user = await models.User.findByPk(req.session.user_id, {
            include: ["worker", "role"],
        });

        if (user) {
            req.session.user = user;
        }
    }

    next();
});

// Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", ratingRoutes);

app.listen(process.env.EXPO_PUBLIC_API_PORT, () => console.log("server running"));
