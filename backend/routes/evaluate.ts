import express from "express";
import { javaScriptController } from "../controllers/javaScriptController";

export const evaluateRouter = express.Router();

evaluateRouter.post("/", javaScriptController);