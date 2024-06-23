import React from 'react'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import { nameLastnameAvatar } from '../utils/stringToColor';

  function stringToColor(string) {
		let hash = 0;
		let i;

		/* eslint-disable no-bitwise */
		for (i = 0; i < string.length; i += 1) {
			hash = string.charCodeAt(i) + ((hash << 5) - hash);
		}

		let color = "#";

		for (i = 0; i < 3; i += 1) {
			const value = (hash >> (i * 8)) & 0xff;
			color += `00${value.toString(16)}`.slice(-2);
		}
		/* eslint-enable no-bitwise */

		return color;
	}

	function stringAvatar(name) {
		return {
			sx: {
				bgcolor: stringToColor(name),
				height: 70,
				width: 70,
				fontSize: 30,
			},
			children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
		};
	}

const UserCard = ({ user, index, setFollowUser }) => {

	const { authUser } = useAuthContext();
  
	const handleFollowUser = async () => {
		try {
			console.log("User ", user);
			console.log("Auth user", authUser);
			const response = await axios.post("http://localhost:3001/users/follow", {
				userId: authUser.username,
				followerId: user.id
			});
			setFollowUser(user.id);
		} catch (err) {
			console.log(err);
		}
	}
  return (
		<div
			key={index}
			className="flex bg-[#3d444a] flex-col items-center gap-2 border p-4 rounded-lg"
		>
			<Avatar
				variant="rounded"
				{...nameLastnameAvatar(`${user.name} ${user.lastname}`)}
				// sx={{ height: "70px", width: "70px", fontSize: "30px" }}
				// variant="rounded"
			></Avatar>
			<div className="text-center text-[#fff] text-md">
				<h1>{user.name}</h1>
				<h1>{user.lastname}</h1>
			</div>
			<div>
				<Button onClick={handleFollowUser} variant="outlined">
					{user.isFollowed ? "Following" : "Follow"}
				</Button>
			</div>
		</div>
	);
}

export default UserCard