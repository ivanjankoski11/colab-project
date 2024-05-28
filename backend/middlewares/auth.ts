import bcrypt from "bcrypt"
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { verifyToken } from "../utils/types";
import { User } from "../models";

export const authorize = (req: any, res: Response, next: NextFunction) => {
    if (req.get("Authorization")) {
        const token = req.get("Authorization") as string;
        let verifyToken;
        try {
            verifyToken = jwt.verify(token, process.env.JWT_SECRET as string) as verifyToken;
        }
        catch (err) {
            console.log(`Error in authorization middleware ${err}`);
            return res.status(401).json({ message: "Bad credentials" });
        }
        req.userId = verifyToken.userId;
        return next();
    }
    else{
        return res.status(401).json({ message: "Bad credentials" });
    }
}

export const signUp = async (req: any, res: Response, next: NextFunction) => {
	try {
		const { name, lastname, email, password } = req.body;
		const user = await User.findOne({
			where: {
				email,
			},
		});
		if (user) {
			return res.status(400).json({ message: "User with this email already exist!" });
		}
		const hashPassword = await bcrypt.hash(password, 12);
        const newUser = User.create({
            name,
            lastname,
            email,
            password: hashPassword
        });
		await newUser.save();
		return res.status(200).json({ message: "User added successfully!" });
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "Adding user failed" });
		throw new Error("Adding user failed");
	}
};

export const login = async (req: any, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;
		console.log(email, password);
		const user = await User.findOne({
			where: { email },
		});
		console.log(user?.email);
		console.log(user?.password);
		if (!user) {
			return res.status(404).json({ message: "User with this email does not exist." });
		}
		const passMatch = await bcrypt.compare(password, user.password);
		if (!passMatch) {
			return res.status(401).json({ message: "Incorrect password" });
		}
		const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "1h" });
		res.status(200).json({ message: "Loged in successfully!", token, user: {name: user.name, lastname: user.lastname, username: user.email}});
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "Authentication failed" });
		throw new Error("Authentication failed");
	}
};