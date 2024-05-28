import express from "express";
import { signUp, login } from "../middlewares/auth";

export const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
