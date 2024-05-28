import { NextFunction, Request, Response } from "express";
import { User } from "../models";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find({ select: ["id", "name", "lastname", "email"] });
    res.status(200).json({ users });
}