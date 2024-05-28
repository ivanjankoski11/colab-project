import React from "react";
import { TextField, Button } from "@mui/material";
import { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthContex";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(null); // New state for handling error messages
	const { setToken } = useContext(AuthContext);
	const { setUser, socket } = useContext(AuthContext);
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:3001/auth/login", {
				email: username,
				password,
			});
			setToken(response.data.token);
			setUser(response.data.user);
			console.log(response.data.user);
			localStorage.setItem("token", response.data.token);
			localStorage.setItem(
				"user",
				JSON.stringify({
					name: response.data.user.name,
					lastname: response.data.user.lastname,
					username: response.data.user.username,
				}),
			);
			navigate("/");
		} catch (error) {
			console.error("Authentication failed:", error);
			setToken(null);
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			if (error.response && error.response.data) {
				setErrorMessage(error.response.data.message);
			} else {
				setErrorMessage("An unexpected error occurred. Please try again.");
			}
		}
	};
	return (
		<div
			className="h-screen flex items-center justify-between opacity-90 p-20"
			style={{ backgroundImage: "url(/images/background.jpg)" }}
		>
			<div className="bg-white h-[500px] w-[500px] rounded-3xl pt-12 p-20 flex flex-col items-center opacity-95">
				<h1 className="text-3xl">Login</h1>
				<div className="mt-16">
					<p>{errorMessage}</p>
					<TextField
						id="outlined-basic"
						label="Email"
						variant="outlined"
						sx={{ width: "320px" }}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="mt-10">
					<TextField
						id="outlined-basic"
						type="password"
						label="Password"
						variant="outlined"
						sx={{ width: "320px" }}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="mt-10" onClick={handleSubmit}>
					<Button variant="contained">Login</Button>
				</div>
				<div className="mt-10">
					<p className="text-blue-700">
						<a href="/register">Register</a>
					</p>
				</div>
			</div>
			<div>
				<h1 className="text-8xl text-white font-bold">Colab</h1>
				<h3 className="text-white text-lg font-medium">Developers platform for sharing code and collaborating</h3>
			</div>
		</div>
	);
};

export default Login;
