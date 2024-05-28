import React from "react";
import { TextField, Button } from "@mui/material";
import { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthContex";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
	const [name, setName] = useState("");
	const [lastname, setLastname] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(null); // New state for handling error messages
	const { setToken } = useContext(AuthContext);
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:3001/auth/signup", {
				name,
				lastname,
				email: username,
				password,
			});
			navigate("/login");
		} catch (error) {
			console.error("Authentication failed:", error);
		}
	};
	return (
		<div
			className="h-screen flex items-center justify-between opacity-90 p-20"
			style={{ backgroundImage: "url(/images/background.jpg)" }}
		>
			<div className="bg-white h-[500px] w-[500px] rounded-3xl p-10 flex flex-col items-center opacity-95">
				<h1 className="text-3xl">Register</h1>
				<div className="flex justify-between w-[100%]">
					<div className="mt-10">
						<TextField id="outlined-basic" label="Name" variant="outlined" sx={{ width: "100%" }} onChange={(e) => setName(e.target.value)} />
					</div>
					<div className="mt-10">
						<TextField id="outlined-basic" label="Lastname" variant="outlined" sx={{ width: "100%" }} onChange={(e) => setLastname(e.target.value)} />
					</div>
				</div>
				<div className="mt-10 p-15 pl-15 w-[100%]">
					<TextField id="outlined-basic" label="Email" variant="outlined" sx={{ width: "100%" }} onChange={(e) => setUsername(e.target.value)} />
				</div>
				<div className="flex w-[100%] justify-between">
					<div className="mt-10">
						<TextField id="outlined-basic" type="password" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)}/>
					</div>
					<div className="mt-10">
						<TextField id="outlined-basic" type="password" label="Confirm password" variant="outlined" onChange={(e) => setConfirmPassword(e.target.value)} />
					</div>
				</div>
				<div className="mt-10">
					<Button variant="contained" onClick={handleSubmit}>Register</Button>
				</div>
			</div>
			<div>
				<h1 className="text-8xl text-white font-bold">Colab</h1>
				<h3 className="text-white text-lg font-medium">Developers platform for sharing code and collaborating</h3>
			</div>
		</div>
	);
};

export default Register;
