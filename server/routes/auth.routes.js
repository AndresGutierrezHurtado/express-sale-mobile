import { Router } from "express";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import FacebookStrategy from "passport-facebook";

import * as models from "../models/relations.js";

const authRoutes = Router();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL:
                process.env.VITE_API_URL + process.env.GOOGLE_CALLBACK_URL,
        },
        async function (accessToken, refreshToken, profile, cb) {
            let user = await models.User.findOne({
                where: {
                    user_email: profile._json.email,
                },
            });

            if (!user) {
                user = await models.User.create({
                    user_email: profile._json.email,
                    user_name: profile._json.given_name,
                    user_lastname: profile._json.family_name,
                    user_password: profile._json.sub,
                });
            }

            return cb(null, user);
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL:
                process.env.VITE_API_URL + process.env.FACEBOOK_CALLBACK_URL,
            profileFields: [
                "id",
                "displayName",
                "email",
                "first_name",
                "last_name",
            ],
        },
        async function (accessToken, refreshToken, profile, cb) {
            if (!profile._json.email) {
                return cb(
                    new Error("La cuenta de Facebook no tiene email asociado.")
                );
            }

            let user = await models.User.findOne({
                where: { user_email: profile._json.email },
            });

            if (!user) {
                user = await models.User.create({
                    user_email: profile._json.email,
                    user_name: profile._json.first_name,
                    user_lastname: profile._json.last_name,
                    user_password: profile._json.id,
                });
            }

            return cb(null, user);
        }
    )
);

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

// google routes
authRoutes.get(
    "/user/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
authRoutes.get(
    "/user/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: process.env.VITE_APP_URL + "/login",
    }),
    (req, res) => {
        req.session.user_id = req.user.user_id;
        res.redirect(process.env.VITE_APP_URL);
    }
);

// facebook routes
authRoutes.get(
    "/user/auth/facebook",
    passport.authenticate("facebook", {
        authType: "rerequest",
        scope: ["email", "public_profile"],
    })
);

authRoutes.get(
    "/user/auth/facebook/callback",
    passport.authenticate("facebook", {
        failureRedirect: process.env.VITE_APP_URL + "/login",
    }),
    (req, res) => {
        res.redirect(process.env.VITE_APP_URL);
    }
);

export default authRoutes;
