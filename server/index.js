import express from "express";
import cors from "cors";
import session from "express-session";
import sequelizeStore from "connect-session-sequelize";
import { sequelize } from "./config/database.js";
import * as models from "./models/relations.js";
const SequelizeStore = new sequelizeStore(session.Store);

// routes
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

const store = new SequelizeStore({
    db: sequelize,
    tableName: "sessions",
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 60 * 60 * 1000,
});
await store.sync();

// Middlewares
app.use(express.json({ limit: "20mb" }));
app.use(
    cors({
        origin: process.env.VITE_APP_URL,
        credentials: true,
    })
);
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        },
    })
);
app.use(async (req, res, next) => {
    if (req.session.user_id) {
        req.session.user = await models.User.findByPk(req.session.user_id, {
            include: [{ model: models.Role, as: "role" }],
        });
    }

    next();
});

app.use("/api/v1", userRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);

app.get("/", (req, res) => res.redirect(process.env.VITE_APP_URL));

app.listen(process.env.VITE_API_PORT, () =>
    console.log(`Server running on port ${process.env.VITE_API_PORT}`)
);
