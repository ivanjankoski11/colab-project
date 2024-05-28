import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";

const Users = () => {
	const [users, setUsers] = useState([]);

	const fetchUsers = async () => {
		const response = await axios.get("http://localhost:3001/users");
		setUsers(response.data.users);
  };


	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<div>
			<h1 className="font-bold text-2xl px-7">Users</h1>
			<div className="grid grid-cols-3 gap-y-6 gap-x-6 pt-8">
				{users.map((user, index) => (
					<UserCard user={user} index={index} />
				))}
			</div>
		</div>
	);
};

export default Users;
