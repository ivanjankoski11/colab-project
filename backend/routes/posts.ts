import express from "express";
import { createPost, getAllPosts } from "../controllers/posts";

export const postsRouter = express.Router();

postsRouter.get("/:userId", getAllPosts);
postsRouter.post("/", createPost);

