import { NextFunction, Request, Response } from "express";
import { User, UserFollowers } from "../models";
import { Not } from "typeorm";

export const getAllUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
    const { id } = req.params;
    console.log("UserID", id);
    if (!id) {
        return res.status(400).json({ message: "Bad request" });
    }
    const users = await User.find({
        where: {
            email: Not(id)
        },
		select: ["id", "name", "lastname", "email",],
    });
    const filtered: any = [];
    await Promise.all(
        users.map(async (mapUser: User) => {
            const isFollowed =await UserFollowers.findOne({
                where: {
                    user: {
                        email: id
                    },
                    following: {
                        id: mapUser.id
                    }
                },
                select: ["user", "following"],
                relations: ["user", "following"]
            });
            if (isFollowed) {
                filtered.push({ ...mapUser, isFollowed: true });
            } else {
                filtered.push({ ...mapUser, isFollowed: false });
            }
        })
    )
    console.log(filtered);
	return await res.status(200).json({ users: filtered });
};

export const followUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
        const { followerId, userId } = req.body;
        console.log(followerId, userId);
        
        if (userId === followerId) {
            return res.status(400).json({ message: "Bad request" });
        }

        const existing = await UserFollowers.findOne({
            where: {
                user: {
                    email: userId,
                },
                following: {
                    id: followerId
                }
            }
        });
        if (existing) {
            return res.status(400).json({ message: "Bad request" });
        }

		const followerUser = await User.findOne({ where: { id: followerId } });
		const user = await User.findOne({ where: { email: userId } });

		if (!user || !followerUser) {
			return res.status(404).json({ message: "User not found" });
        }

        await UserFollowers.create({
            user: user,
            following: followerUser
        }).save();

		return res
			.status(200)
			.json({ message: `You started following ${followerUser.email}` });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};
