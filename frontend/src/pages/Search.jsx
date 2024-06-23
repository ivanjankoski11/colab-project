import React from "react";
import UserCard from "../components/UserCard";
import { useDataContext } from "../context/DataContext";
import Post from "../components/Post";

const SearchPage = () => {
    const { searchPostAndUsers } = useDataContext();

	return (
		<div className="pl-2 pb-16">
			<h1 className="font-bold text-2xl text-[#fff] px-2">Users</h1>
			{searchPostAndUsers.users.length ? (
				<div className="grid grid-cols-3 gap-y-6 gap-x-6 pt-8">
					{searchPostAndUsers?.users?.map((user, index) => (
						<UserCard user={user} index={index} />
					))}
				</div>
			) : (
				<p className="py-4 px-8 text-[#dbdbdb]">No users found</p>
			)}
			<h1 className="font-bold text-2xl pt-8 text-[#fff] px-2">Posts</h1>
			{searchPostAndUsers.posts.length ? (
				searchPostAndUsers.posts.map((post) => {
					return <Post post={post} />;
				})
			) : (
				<p className="py-4 px-8 text-[#dbdbdb]">No posts found</p>
			)}
		</div>
	);
};

export default SearchPage;
