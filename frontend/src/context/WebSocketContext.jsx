import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [roomId, setRoomId] = useState("");
	const [users, setUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			const room = localStorage.getItem("roomId");
			const socket = io("http://localhost:3001/", {
				query: {
					userId: authUser.username,
					roomId: room ? room : undefined,
				},
			});

			setSocket(socket);
			setRoomId(room);

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	useEffect(() => {
		if (socket) {
			socket.on("roomCreated", (roomId) => {
				console.log("Created room", roomId);
				setRoomId(roomId);
				if (roomId) {
					localStorage.setItem("roomId", roomId);
				}
			});
		}
	}, [socket]);

	useEffect(() => {
		console.log("User is changed");
		if (socket) {
			const handleUsersUpdate = (users) => {
				console.log("Users here: ", users);
				setUsers(users);
			};

			socket.on("users", handleUsersUpdate);

			return () => {
				socket.off("users", handleUsersUpdate);
			};
		}
	}, [socket, setUsers]);

	useEffect(() => {
		const localRoom = localStorage.getItem("roomId");
		if (localRoom !== undefined && socket) {
			console.log("Reconnecting and joining room", localRoom);
			setRoomId(localRoom);
			socket.emit("join", { roomId: localRoom });
			console.log(roomId);
		}
	}, [socket]);

	window.addEventListener("storage", () => {
		setRoomId(localStorage.getItem("roomId"));
	});

	return (
		<SocketContext.Provider
			value={{ socket, roomId, setRoomId, users, setUsers }}
		>
			{children}
		</SocketContext.Provider>
	);
};
