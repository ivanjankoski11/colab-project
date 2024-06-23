import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";
import { useAuthContext } from "../context/AuthContext";

const Users = () => {
	const [users, setUsers] = useState([]);
	const { authUser } = useAuthContext();
	const [followUser, setFollowUser] = useState("");

	const fetchUsers = async () => {
		if (authUser) {
			console.log(authUser);
			try {
				const response = await axios.get(
					`http://localhost:3001/users/${authUser.username}`
				);
				setUsers(response.data.users);
				console.log(response.data.users);
			} catch (err) {
				console.log(err);
			}
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	useEffect(() => {
		fetchUsers();
	}, [followUser]);

	return (
		<div className="pl-2">
			<h1 className="font-bold text-2xl text-[#fff] px-7">Users</h1>
			<div className="grid grid-cols-3 gap-y-6 gap-x-6 pt-8">
				{users.map((user, index) => (
					<UserCard setFollowUser={setFollowUser} user={user} index={index} />
				))}
			</div>
		</div>
	);
};

export default Users;
