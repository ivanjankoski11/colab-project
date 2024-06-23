import express from "express";
import {  getAllUsers, followUser } from "../controllers/users";

export const userRouter = express.Router();

userRouter.get("/:id", getAllUsers);
userRouter.post("/follow", followUser);