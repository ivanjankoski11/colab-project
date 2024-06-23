import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { IOSSwitch } from "./Switch";
import { useSocketContext } from "../context/WebSocketContext";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(
	props,
	ref
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogCoding({ open, setOpen }) {
	const [roomType, setRoomType] = useState("");
	const [language, setLanguage] = useState("");
	const { roomId, setRoomId, socket } = useSocketContext();
	const navigate = useNavigate();

	// React.useEffect(() => {
	// 	socket.on("userJoined", (value) => {
	// 		console.log(value);
	// 	})
	// }, []);

	const handleLanguage = (e) => {
		setLanguage(e.target.value);
	}

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleJoinRoom = () => {
		localStorage.setItem("roomId", roomId);
		socket.emit("join", { roomId: roomId });
		navigate('/coding');
	}

	const handleCreateRoom = () => {
		socket.emit("create");
		navigate('/coding');
		// socket.emit("createRoom", { user });
		// setJoin(true);
		// console.log("Clicked");
	}

	const handleRoomId = (e) => {
		setRoomId(e.target.value);
	}

	const handleClose = () => {
		setRoomType("");
		setOpen(false);
	};

	const languages = [
		{
			label: "JavaScript",
			value: "JavaScript"
		}
	]

	return (
		<React.Fragment>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle>{"Coding session"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						To start a new coding session you need to create or join a room.
					</DialogContentText>
					{roomType === "join" ? (
						<div className="py-10 flex flex-col justify-center items-center gap-5">
							<TextField id="outlined-basic" label="Room ID" onChange={handleRoomId} variant="outlined" />
							<div className="flex gap-5 items-center">
								<Button onClick={handleJoinRoom} variant="contained" sx={{ paddingX: 3, paddingY: 1 }} color="success">
									join
								</Button>
								<Button onClick={() => setRoomType("")} variant="outlined" sx={{ paddingX: 3, paddingY: 1 }}>
									back
								</Button>
							</div>
						</div>
					) : roomType === "create" ? (
						<div className="flex flex-col items-center justify-center py-10 px-16">
							<Autocomplete
								disablePortal
								id="combo-box-demo"
								options={languages}
								sx={{ width: "70%" }}
								renderInput={(params) => <TextField {...params} label="Language" />}
							/>
							<div className="flex items-center justify-center gap-5 py-5">
								<h1>Enable console</h1>
								<IOSSwitch sx={{ m: 1 }} defaultChecked />
							</div>
							<div className="flex justify-between items-center w-[68%]">
								<Button onClick={handleCreateRoom} variant="contained" sx={{ paddingX: 3, paddingY: 1 }} color="success">
									Create
								</Button>
								<Button onClick={() => setRoomType("")} variant="outlined" sx={{ paddingX: 3, paddingY: 1 }}>
									back
								</Button>
							</div>
						</div>
					) : (
						<></>
					)}

					{roomType === "" ? (
						<>
							<div className="flex items-center justify-center gap-5 py-10">
								<Button
									onClick={() => setRoomType("join")}
									sx={{ width: "100px", height: "100px" }}
									variant="contained"
								>
									Join room
								</Button>
								<Button
									onClick={() => setRoomType("create")}
									variant="contained"
									sx={{ width: "100px", height: "100px" }}
									color="success"
								>
									Create room
								</Button>
							</div>
						</>
					) : (
						<></>
					)}
				</DialogContent>
				{/* <DialogActions>
					<Button onClick={handleClose}>Disagree</Button>
					<Button onClick={handleClose}>Agree</Button>
				</DialogActions> */}
			</Dialog>
		</React.Fragment>
	);
}
