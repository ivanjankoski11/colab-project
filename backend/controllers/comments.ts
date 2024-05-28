import { NextFunction, Request, Response } from "express";
import { Post, User, Comment } from "../models";

export const createComment = async (req: Request, res: Response, _next: NextFunction) => {
    const { email, postId, text } = req.body;
    const user = await User.findOneBy({ email: email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const post = await Post.findOneBy({ id: postId });
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    await Comment.create({
        user: user,
        post: post,
        text: text
    }).save();
    return res.status(200).json({ message: "Comment added" });
}

export const getPostComments = async (req: Request, res: Response, _next: NextFunction) => {
	const { postId } = req.params;
	if (!postId) {
		return res.status(400).json({ message: "Must specify postId" });
	}
	const post = await Post.findOneBy({ id: parseInt(postId) });
	if (!post) {
		return res.status(404).json({ message: "Post not found" });
	}
	const comments = await Comment.findAndCount({ where: { post } });
	return res.status(200).json({ comments });
};
