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

// Google Auth
authRoutes.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRoutes.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
    req.session.user_id = req.user.user_id;
    console.log("Usuario autenticado:", req.user.user_id);
    res.redirect(process.env.EXPO_PUBLIC_DEEP_LINK);
});

// Facebook Auth
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

// Github Auth
authRoutes.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));
authRoutes.get("/auth/github/callback", passport.authenticate("github"), function (req, res) {
    req.session.user_id = req.user.user_id;
    console.log("Usuario autenticado:", req.user.user_id);
    res.redirect(process.env.EXPO_PUBLIC_DEEP_LINK);
});

// Normal Auth
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

authRoutes.post("/auth/logout", (req, res) => {
    req.session.destroy();

    res.status(200).json({
        success: true,
        message: "Sesión cerrada correctamente",
        data: null,
    });
});

export default authRoutes;
