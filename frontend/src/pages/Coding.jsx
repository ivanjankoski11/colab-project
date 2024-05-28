// Coding.js
import React, { useState, useEffect, useCallback, useContext } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { materialDark } from "@uiw/codemirror-theme-material";
import axios from "axios";
import Button from "@mui/material/Button";
import { AuthContext } from "../providers/AuthContex";

const Coding = () => {
	const [value, setValue] = useState("console.log('Hello World!');");
	const [output, setOutput] = useState("");
	const { user, socket } = useContext(AuthContext);

	useEffect(() => {
		if (!socket) return;
		// Listen for changes from other users
		socket.on("codeChange", (newValue) => {
			console.log(newValue);
			setValue(newValue.val);
		});
		socket.on("userJoined", (user) => {
			console.log(user);
		});
		return () => {
			socket.off("codeChange");
			socket.off("userJoined");
		};
	}, [socket]);

	const onChange = useCallback(
		(val, viewUpdate) => {
			const roomId = localStorage.getItem("roomId");
			// Send changes to server
			socket.emit("codeChange", { val, user, roomId });
			setValue(val);
		},
		[socket],
	);

	const executeCode = async () => {
		try {
			const response = await axios.post("http://localhost:3001/evaluate", { code: value });
			console.log(response);
			const { result } = response.data;
			setOutput(result.toString());
		} catch (error) {
			console.error("Error executing code:", error);
			setOutput("Error executing code");
		}
	};

	return (
		<div className="flex">
			<div className="h-[100vh] bg-blue-50 flex flex-col w-[80%]">
				<div className="">
					<CodeMirror
						height="450px"
						width="100%"
						theme={materialDark}
						value={value}
						extensions={[javascript({ jsx: true })]}
						onChange={onChange}
					/>
				</div>
				<div className="flex flex-col gap-2 items-start p-3 bg-[#333] h-[100%] border-t-2 border-[#a3a3a3] resize-y">
					<Button onClick={executeCode} variant="contained" color="success">
						Run code
					</Button>
					<div className="text-[#6bff61]">
						Output: <p className="text-white">{output}</p>
					</div>
				</div>
			</div>
			<div className="w-[20%]">
				<h1>Hello</h1>
			</div>
		</div>
	);
};

export default Coding;
