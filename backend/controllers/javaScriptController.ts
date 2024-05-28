import { NextFunction, Request, Response } from "express";

export const javaScriptController = async (req: Request, res: Response, next: NextFunction) => {
	const originalLog = console.log;
	console.log = function (...value) {
		originalLog.apply(console, value);
		return value;
	};
	const output = eval('console.log("hello")');
	try {
		const { code } = req.body;
		const result = eval(code); // Execute code (use a safer method in production)
		res.json({ result });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};
