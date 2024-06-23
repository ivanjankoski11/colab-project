// Coding.js
import React, { useState, useEffect, useCallback } from "react";
import CodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { materialDark } from "@uiw/codemirror-theme-material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../utils/stringToColor";
import { useSocketContext } from "../context/WebSocketContext";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CopyToClipboard from "react-copy-to-clipboard";
import DoneIcon from "@mui/icons-material/Done";

export const Coding = () => {
	const [value, setValue] = useState("console.log('Hello world!');");
	const [output, setOutput] = useState([]);
	const navigate = useNavigate();
	const { socket, users, setUsers } = useSocketContext();
	const roomId = localStorage.getItem("roomId");
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		console.log("Coding: ", users);
	}, [users, socket, setUsers]);

	// useEffect(() => {
	// 	if (!users) {
	// 		return <div>Loading...</div>;
	// 	}
	// }, []);

	useEffect(() => {
		if (!socket) return;
		socket.on("codeChange", (newValue) => {
			setValue(newValue.val);
			console.log("Changed code...", newValue);
		});
		socket.on("codeOutput", (newValue) => {
			setOutput(newValue.code);
		});
	}, [socket, users]);

	useEffect(() => { }, [users, output]);
	
	useEffect(() => {

	}, [users]);

	const onChange = useCallback(
		(val, viewUpdate) => {
			socket.emit("codeChange", { val });
			setValue(val);
		},
		[socket]
	);

	const leaveRoom = () => {
		socket.emit("leaveRoom");
		localStorage.removeItem("roomId");
		navigate("/");
	};

	const executeCode = () => {
		socket.emit("runCode", { code: value });
	};
	return (
		<div className="flex h-[100vh] overflow-hidden">
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
				<div className="flex flex-col overflow-y-scroll gap-2 items-start p-3 bg-[#2e3235] h-[100%] border-t border-[#a3a3a3]">
					<Button
						onClick={() => executeCode()}
						variant="contained"
						color="success"
					>
						Run code
					</Button>
					<div className="text-[#6bff61] w-[100%]">
						Output:{" "}
						{output.map((out) => {
							return <p className="text-[#cfcfcf] text-sm">{out}</p>;
						})}
					</div>
				</div>
			</div>
			<div className="w-[20%] h-[100vh] bg-[#2e3235] flex flex-col p-3 border-l-2 border-[#5c5c5c]">
				<div
					className={`flex-1 grid gap-3 h-[100%] ${
						users?.length > 3 ? "grid-cols-2" : "grid-cols-1"
					} `}
				>
					{users ? (
						users.map((user) => {
							return (
								<div
									style={{
										borderRadius: "6px",
										height: users.length === 1 ? "50%" : "100%",
									}}
									className="w-[100%] border-2"
									key={user.id}
								>
									<Avatar
										style={{
											width: "100%",
											height: "100%",
										}}
										className="w-[100%]"
										sx={{ width: 100 }}
										variant="rounded"
										{...stringAvatar(user.username)}
									/>
								</div>
							);
						})
					) : (
						<></>
					)}
				</div>
				<div className="h-[100%] flex flex-1 gap-2 flex-col justify-end items-center">
					<div className="flex items-center gap-2 w-[100%] text-sm bg-[#686b6d] p-3 rounded-md">
						<input
							type="text"
							disabled
							value={roomId}
							className="text-xs text-[#c4c4c4] w-[100%] bg-[#686b6d]"
						/>
						<CopyToClipboard text={roomId} onCopy={() => setCopied(true)}>
							{copied ? (
								<DoneIcon style={{ color: "#c4c4c4" }} fontSize="25px" />
							) : (
								<ContentCopyIcon style={{ color: "#c4c4c4" }} fontSize="25px" />
							)}
						</CopyToClipboard>
					</div>
					<Button onClick={leaveRoom} variant="contained" className="w-[100%]">
						Leave
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Coding;
