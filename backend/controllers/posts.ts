import { NextFunction, Request, Response } from "express";
import { User, Post, UserFollowers } from "../models";
import { In } from "typeorm";

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const user = await User.findOne({
            where: {
                email: userId
            }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const userFollowers = await UserFollowers.find({
            where: {
                user: {
                    id: user.id
                }
            },
            relations: ["following","user"]
        });
        if (!userFollowers) {
            return res.status(200).json({ posts: [] });
        }
        const ids = userFollowers.map((usr) => usr.following.id);
        ids.push(user.id);
        const posts = await Post.find({
            where: {
                user: {
                    id: In(ids)
                }
            },
            order: {
                createdAt: "DESC"
            }
        });
		return res.status(200).json({ posts });
    } catch (err) {
        return res.status(400).json({ message: "Bad request" });
    }
}

export const createPost = async (req: Request, res: Response, _next: NextFunction) => {
    const { title, text, email } = req.body;
    const user = await User.findOneBy({ email });
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