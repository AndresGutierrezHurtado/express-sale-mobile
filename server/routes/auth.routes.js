import { Router } from "express";

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GitHubStrategy } from "passport-github2";

import * as models from "../models/relations.js";

passport.serializeUser((user, done) => {
    done(null, user.usuario_id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await models.User.findOne({ where: { usuario_id: id } });
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
            callbackURL: process.env.VITE_API_URL + process.env.GOOGLE_REDIRECT_URI,
            scope: ["profile", "email"],
        },
        async function (accessToken, refreshToken, profile, cb) {
            let user = await models.User.findOne({
                where: { usuario_correo: profile._json.email },
            });

            if (user) return cb(null, user);

            // Create new user
            let newUser = models.User.create({
                usuario_id: crypto.randomUUID(),
                usuario_nombre: profile._json.given_name,
                usuario_apellido: profile._json.family_name,
                usuario_correo: profile._json.email,
                usuario_alias:
                    profile._json.given_name.split(" ")[0] +
                    "_" +
                    profile._json.family_name.split(" ")[0],
                usuario_contra: profile._json.sub,
                usuario_imagen_url: profile._json.picture,
                rol_id: 1,
            });

            return cb(null, newUser);
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: process.env.VITE_API_URL + process.env.FACEBOOK_REDIRECT_URI,
            profileFields: ["id", "email", "first_name", "last_name", "picture"],
        },
        async function (accessToken, refreshToken, profile, cb) {
            if (!profile._json.email) {
                return cb(new Error("Cuenta de Facebook sin correo electronico disponible"), null);
            }

            let user = await models.User.findOne({
                where: { usuario_correo: profile._json.email },
            });

            if (user) return cb(null, user);

            // Create new user
            let newUser = models.User.create({
                usuario_id: crypto.randomUUID(),
                usuario_nombre: profile._json.first_name,
                usuario_apellido: profile._json.last_name,
                usuario_correo: profile._json.email,
                usuario_alias:
                    profile._json.first_name.split(" ")[0] +
                    "_" +
                    profile._json.last_name.split(" ")[0],
                usuario_contra: profile._json.id,
                usuario_imagen_url: profile._json.picture.data.url,
                rol_id: 1,
            });

            return cb(null, newUser);
        }
    )
);

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.VITE_API_URL + process.env.GITHUB_REDIRECT_URI,
        },
        async function (accessToken, refreshToken, profile, cb) {
            let user = await models.User.findOne({
                where: { usuario_correo: profile._json.email },
            });

            if (user) return cb(null, user);

            // Create new user
            let newUser = models.User.create({
                usuario_id: crypto.randomUUID(),
                usuario_nombre: profile._json.name.split(" ")[0],
                usuario_apellido: profile._json.name.split(" ")[1],
                usuario_correo: profile._json.email,
                usuario_alias: profile._json.login,
                usuario_contra: profile._json.id,
                usuario_imagen_url: profile._json.avatar_url,
                rol_id: 1,
            });

            return cb(null, newUser);
        }
    )
);

const authRoutes = Router();

// Google Auth
authRoutes.get(
    "/user/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

authRoutes.get(
    "/user/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: `${process.env.VITE_URL}/login?error=true`,
    }),
    (req, res) => {
        req.session.usuario_id = req.user.usuario_id;
        req.session.user = req.user;
        res.redirect(process.env.VITE_URL);
    }
);

// Facebook Auth
authRoutes.get(
    "/user/auth/facebook",
    passport.authenticate("facebook", {
        scope: ["email"],
    })
);

authRoutes.get(
    "/user/auth/facebook/callback",
    passport.authenticate("facebook", {
        failureRedirect: `${process.env.VITE_URL}/login?error=true`,
    }),
    (req, res) => {
        req.session.usuario_id = req.user.usuario_id;
        req.session.user = req.user;
        res.redirect(process.env.VITE_URL);
    }
);

// Github Auth
authRoutes.get("/user/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

authRoutes.get(
    "/user/auth/github/callback",
    passport.authenticate("github", { failureRedirect: `${process.env.VITE_URL}/login?error=true` }),
    function (req, res) {
        req.session.usuario_id = req.user.usuario_id;
        req.session.user = req.user;
        res.redirect(process.env.VITE_URL);
    }
);

export default authRoutes;
