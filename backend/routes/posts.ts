import express from "express";
import { createPost, getAllPosts } from "../controllers/posts";

export const postsRouter = express.Router();

postsRouter.get("/", getAllPosts);
postsRouter.post("/", createPost);

