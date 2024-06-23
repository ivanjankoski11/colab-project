import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";

export const DataContext = createContext();

export const useDataContext = () => {
	return useContext(DataContext);
};

export const DataContextProvider = ({ children }) => {
	const [posts, setPosts] = useState([]);
	const [commentAdded, setCommentAdded] = useState("");
	const [searchPostAndUsers, setSearchPostAndUsers] = useState({});
	const { authUser } = useAuthContext();

	const getPosts = async () => {
		if (authUser) {
			try {
				const response = await axios.get(
					`http://localhost:3001/posts/${authUser.username}`
                );
                console.log(response.data);
				setPosts(response.data.posts);
			} catch (err) {
				console.log(err);
			}
		}
	};

	const search = async (query) => {
        try {
			const response = await axios.get(
				`http://localhost:3001/search?query=${query}`
			);
            setSearchPostAndUsers(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getPosts();
	}, []);

	useEffect(() => {
		getPosts();
	}, [authUser]);

	useEffect(() => {
		getPosts();
	}, [commentAdded]);

	return (
		<DataContext.Provider
			value={{ posts, setPosts, commentAdded, setCommentAdded, search, searchPostAndUsers }}
		>
			{children}
		</DataContext.Provider>
	);
};
