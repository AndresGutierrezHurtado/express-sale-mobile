import { Router } from "express";
import bcrypt from "bcrypt";

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GitHubStrategy } from "passport-github2";

import * as models from "../models/index.js";

passport.serializeUser((user, done) => {
    done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await models.User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_REDIRECT_URL,
        },
        async function (accessToken, refreshToken, profile, cb) {
            const info = profile._json;

            const user = await models.User.findOrCreate({
                where: {
                    user_email: info.email,
                },
                defaults: {
                    user_name: info.given_name,
                    user_lastname: info.family_name,
                    user_alias: info.name + "_" + info.family_name,
                    user_email: info.email,
                    user_image_url: info.picture,
                    user_password: bcrypt.hashSync(info.sub, 10),
                },
            });

            return cb(null, user[0]);
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: process.env.FACEBOOK_REDIRECT_URL,
            profileFields: ["id", "email", "first_name", "last_name", "picture"],
        },
        async function (accessToken, refreshToken, profile, cb) {
            const info = profile._json;

            if (!info.email) {
                return cb(new Error("Cuenta de Facebook sin correo electronico disponible"), null);
            }

            const user = await models.User.findOrCreate({
                where: {
                    user_email: info.email,
                },
                defaults: {
                    user_name: info.first_name,
                    user_lastname: info.last_name,
                    user_alias: info.first_name + "_" + info.last_name,
                    user_email: info.email,
                    user_image_url: info.picture.data.url,
                    user_password: bcrypt.hashSync(info.id, 10),
                },
            });

            return cb(null, user[0]);
        }
    )
);

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_REDIRECT_URL,
        },
        async function (accessToken, refreshToken, profile, cb) {
            const info = profile._json;

            if (!info.email) {
                return cb(new Error("Cuenta de GitHub sin correo electronico disponible"), null);
            }

            const user = await models.User.findOrCreate({
                where: {
                    user_email: info.email,
                },
                defaults: {
                    user_name: info.name.split(" ")[0],
                    user_lastname: info.name.split(" ")[1],
                    user_alias: info.login,
                    user_email: info.email,
                    user_password: bcrypt.hashSync(info.id.toString(), 10),
                    user_image_url: info.avatar_url,
                },
            });

            return cb(null, user[0]);
        }
    )
);

const authRoutes = Router();

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Iniciar sesión con Google
 *     description: Iniciar sesión con Google
 *     tags:
 *       - Autenticación
 *     responses:
 *       302:
 *         description: Redirecciona a la página de inicio
 *
 */
authRoutes.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

authRoutes.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
    req.session.user_id = req.user.user_id;
    console.log("Usuario autenticado:", req.user.user_id);
    res.redirect(process.env.EXPO_PUBLIC_DEEP_LINK);
});

/**
 * @swagger
 * /auth/facebook:
 *   get:
 *     summary: Iniciar sesión con Facebook
 *     description: Iniciar sesión con Facebook
 *     tags:
 *       - Autenticación
 *     responses:
 *       302:
 *         description: Redirecciona a la página de inicio
 *
 */
authRoutes.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
        scope: ["email"],
    })
);

authRoutes.get("/auth/facebook/callback", passport.authenticate("facebook"), (req, res) => {
    req.session.user_id = req.user.user_id;
    console.log("Usuario autenticado:", req.user.user_id);
    res.redirect(process.env.EXPO_PUBLIC_DEEP_LINK);
});

/**
 * @swagger
 * /auth/github:
 *   get:
 *     summary: Iniciar sesión con GitHub
 *     description: Iniciar sesión con GitHub
 *     tags:
 *       - Autenticación
 *     responses:
 *       302:
 *         description: Redirecciona a la página de inicio
 *
 */
authRoutes.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

authRoutes.get("/auth/github/callback", passport.authenticate("github"), function (req, res) {
    req.session.user_id = req.user.user_id;
    console.log("Usuario autenticado:", req.user.user_id);
    res.redirect(process.env.EXPO_PUBLIC_DEEP_LINK);
});

/**
 * @swagger
 * /auth/session:
 *   get:
 *     summary: Verificar sesión
 *     description: Verificar si el usuario está autenticado
 *     tags:
 *       - Autenticación
 *     responses:
 *       200:
 *         description: Usuario autenticado
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
 *                   example: "Usuario autenticado"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: number
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
 *                       type: number
 *                     worker:
 *                       type: object
 *                       properties:
 *                         worker_id:
 *                           type: number
 *                         worker_description:
 *                           type: string
 *                         worker_balance:
 *                           type: number
 *       401:
 *         description: Credenciales incorrectas
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
 *                   example: "Usuario no autenticado"
 *                 data:
 *                   type: object
 */
authRoutes.get("/auth/session", async (req, res) => {
    if (!req.session.user_id) {
        res.status(200).json({ success: false, message: "Usuario no autenticado", data: null });
        return;
    }

    res.status(200).json({
        success: true,
        message: "Usuario autenticado",
        data: req.session.user,
    });
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Iniciar sesión con correo y contraseña
 *     tags:
 *       - Autenticación
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_email:
 *                 type: string
 *               user_password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario autenticado
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
 *                     user_id:
 *                       type: number
 *                     user_name:
 *                       type: string
 *                     user_lastname:
 *                       type: string
 *                     user_alias:
 *                       type: string
 *                     user_email:
 *                       type: string
 *                     user_image_url:
 *                       type: string
 *                     user_password:
 *                       type: string
 *                     user_is_active:
 *                       type: boolean
 *                     user_is_admin:
 *                       type: boolean
 *                     user_is_worker:
 *                       type: boolean
 *                     user_is_client:
 *                       type: boolean
 *                     created_at:
 *                       type: string
 *                     updated_at:
 *                       type: string
 *                     deleted_at:
 *                       type: string
 *       401:
 *         description: Credenciales incorrectas
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
 *                   example: "Credenciales incorrectas"
 *                 data:
 *                   type: object
 *                   properties: {}
 *
 */
authRoutes.post("/auth/login", async (req, res) => {
    try {
        const { user_email, user_password } = req.body;

        const user = await models.User.findOne({
            where: { user_email },
        });

        if (!user) {
            return res.status(401).json({ success: false, message: "Usuario no encontrado" });
        }

        if (!bcrypt.compareSync(user_password, user.user_password)) {
            return res.status(200).json({ success: false, message: "Contraseña incorrecta" });
        }

        // Create session
        req.session.user_id = user.user_id;

        res.status(200).json({
            success: true,
            message: "El usuario esta autenticado",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: null,
        });
    }
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Cerrar sesión
 *     description: Cerrar la sesión actual
 *     tags:
 *       - Autenticación
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             message:
 *               type: string
 *             data:
 *               type: object
 *               properties: {}
 *
 */
authRoutes.post("/auth/logout", (req, res) => {
    req.session.destroy();

    res.status(200).json({
        success: true,
        message: "Sesión cerrada correctamente",
        data: null,
    });
});

export default authRoutes;
