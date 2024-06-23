import { NextFunction, Request, Response } from "express";
import { Post, User } from "../models";
import { ILike, Like } from "typeorm";

export const search = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { query } = req.query;
        const posts = await Post.find({
            where: {
                title: ILike(`%${query as string}%`)
            },
            order: {
                createdAt: "DESC"
            }
        });
        const users = await User.find({
            where: {
                name: ILike(`%${query as string}%`)
            }
        });
        res.status(200).json({ posts, users });
    } catch (err: any) {
        res.status(404).json({ error: 'No post found' });
    }
}