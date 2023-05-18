import express, { Router } from "express";
import { body } from "express-validator";
import favoriteController from "../controllers/favorite.controller.js";
import userController from "../controllers/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import userModel from "../models/user.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

// signup routes
router.post(
    "/signup",
    body("username")
    .exists().withMessage("username is required")
    .isLength({ min: 8 }).withMessage("username minimum 8 characters")
        .custom(async value => {
            const user = await userModel.findOne({ username: value });
            if (user) return Promise.reject("username already used");
        }),
    body("password")
    .exists().withMessage("password is required")
    .isLength({ min: 8 }).withMessage("password minimum 8 characters"),
    body("confirmPassword")
    .exists().withMessage("confirmPassword is required")
    .isLength({ min: 8 }).withMessage("confirmPassword minimum 8 characters")
    .custom(( value, { req }) => {
        if (value !== req.body.password) throw new Error("confirmPassword not match")
        return true;
    }),
    body("displayName")
    .exists().withMessage("displayName is required")
    .isLength({ min: 8 }).withMessage("password minimum 8 characters"),
    requestHandler.validate,
    userController.signup
);

// signin routes
router.post(
    "/signin",
    body("username").isLength({ min: 8 }).withMessage("username minimum 8 characters"),
    body("password").isLength({ min: 8 }).withMessage("password minimum 8 characters"),
    requestHandler.validate,
    userController.signin
);

// update routes
router.put(
    "/update-password",
    tokenMiddleware.auth,
    body("password")
    .exists().withMessage("password is required")
    .isLength({ min: 8 }).withMessage("password minimum 8 characters"),
    body("newPassword")
    .exists().withMessage("newPassword is required")
    .isLength({ min: 8 }).withMessage("newPassword minimum 8 characters"),
    body("confirmNewPassword")
    .exists().withMessage("confirmNewPassword is required")
    .isLength({ min: 8 }).withMessage("confirmNewPassword minimum 8 characters")
    .custom(( value, { req }) => {
        if (value !== req.body.password) throw new Error("confirmNewPassword not match")
        return true;
    }),
    requestHandler.validate,
    userController.updatePassword
);

// getinfo routes
router.get(
    "/info",
    tokenMiddleware.auth,
    userController.getInfo
);

// favorite routes get & post
router.get(
    "/favorites",
    tokenMiddleware.auth,
    favoriteController.getFavoritesOfUser
);

router.post(
    "/favorites",
    tokenMiddleware.auth,
    body("mediatype")
        .exists().withMessage("mediaType is required")
        .custom(type => ["movie", "tv"].includes(type)).withMessage("mediaType invalid"),
    body("mediaId")
        .exists().withMessage("mediaId is required")
        .isLength({ min: 1 }).withMessage("mediaId can't be empty"),
    body("mediaTitle")
        .exists().withMessage("mediaTitle is required"),
    body("mediaPoster")
        .exists().withMessage("mediaPoster is required"),
    body("mediaRate")
        .exists().withMessage("mediaRate is required"),
    requestHandler.validate,
    favoriteController.addFavorite
);

// delete favorites routes
router.delete(
    "/favorites/:favoritesId",
    tokenMiddleware.auth,
    favoriteController.removeFavorite
);

export default router;