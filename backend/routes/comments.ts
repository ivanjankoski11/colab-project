import express from "express";
import { createComment, getPostComments } from "../controllers/comments";

export const commentsRouter = express.Router();

commentsRouter.post("/", createComment);
commentsRouter.get("/:postId", getPostComments);