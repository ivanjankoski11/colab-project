import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Coding from "./pages/Coding";
import Register from "./pages/Register";
import { AuthProvider } from "./providers/AuthContex";
import { io } from "socket.io-client";


function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [connected, setConnected] = useState(false);
	const [token, setToken] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");
		setToken(token);
		if (token) {
			setIsAuthenticated(true);
		}
	}, []);


	const handleLogin = (token) => {
		localStorage.setItem("token", token);
		setIsAuthenticated(true);
		setToken(token);
		console.log("Setting to true");
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("roomId");
		setIsAuthenticated(false);
		// Disconnect WebSocket when the user logs out
	};

	return (
		<Router>
			<AuthProvider isAuthenticated={isAuthenticated}>
				<Routes>
					<Route exact path="/" element={<Home isAuthenticated={isAuthenticated} handleLogout={handleLogout}  />} />
					<Route path="/login" element={<Login onLogin={handleLogin} isAuthenticated={isAuthenticated} />} />
					<Route path="/coding" element={<Coding isAuthenticated={isAuthenticated} />} />
					<Route path="/register" element={<Register isAuthenticated={isAuthenticated} />} />
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
