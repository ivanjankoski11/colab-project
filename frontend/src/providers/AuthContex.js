import React, { createContext, useState, useEffect } from "react";
import io, { connect } from "socket.io-client";

export const AuthContext = createContext();

const newSocket = io("http://localhost:3001/", {
	autoConnect: false
});

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState({});
	const [roomId, setRoomId] = useState("");
	const [socket, setSocket] = useState(null);
	
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		const storedUser = localStorage.getItem("user");
		const storedRoomId = localStorage.getItem("roomId");
		const parsedUser = JSON.parse(localStorage.getItem("user"));
		setToken(storedToken);
		setSocket(newSocket);
		setUser(JSON.parse(storedUser));
		setLoading(false);
		setRoomId(roomId);
	}, []);

	useEffect(() => {
		if (user) {
			newSocket.connect();
			setTimeout(() => {
				if (user.username !== undefined)
				{
					newSocket.emit("username", user.username);
				}
			}, 1000);
		}
		return () => {
			newSocket.disconnect();
			newSocket.off();
		}
	}, [user]);

	return <AuthContext.Provider value={{ token, setToken, loading, setUser, user, roomId, setRoomId, socket }}>{children}</AuthContext.Provider>;
};
