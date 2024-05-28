import express from "express";
import { getAllUsers } from "../controllers/users";

export const userRouter = express.Router();

userRouter.get("/", getAllUsers);