import { NextFunction, Request, Response } from "express";
import { User, Post } from "../models";

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    const posts = await Post.find();
    res.status(200).json({ posts });
}

export const createPost = async (req: Request, res: Response, _next: NextFunction) => {
    const { title, text, userEmail } = req.body;
    const user = await User.findOneBy({ email: userEmail });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    await Post.create({
        title,
        text,
        upVotes: 0,
        downVotes: 0,
        user: user
    }).save();
    return res.status(200).json({ message: "Post created" });
}