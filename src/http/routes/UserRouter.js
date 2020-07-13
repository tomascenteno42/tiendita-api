import express from "express";

import { AuthController } from "../../core/controllers/AuthController";

import { authMiddleware } from "../middlewares/auth";

const { Router } = express;

export const users = Router();


users.post("/register", AuthController.register);

users.post("/login", AuthController.login);

users.get("/me", authMiddleware, AuthController.me);

