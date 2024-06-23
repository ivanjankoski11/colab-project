import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { nameLastnameAvatar } from "../utils/stringToColor";
import { useDataContext } from "../context/DataContext";

const AskQuestion = ({name, lastname}) => {
	const [isActive, setIsActive] = useState(false);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const { authUser } = useAuthContext();
	const { setCommentAdded, comment } = useDataContext();

	useEffect(() => {

	}, [isActive]);

	const handleCreatePost = async () => {
		if (title !== "" && content !== "") {
			try {
				const response = await axios.post("http://localhost:3001/posts", {
					title: title,
					text: content,
					email: authUser.username
				});
				console.log(response);
				setCommentAdded(content + title);
				setTitle("");
				setContent("");
			} catch (err) {
				console.log(err);
			}
			
		}
	};

	const handleOnClick = () => {
		setIsActive(true);
		handleCreatePost();
	}

	return (
		<div className="border-2 flex flex-col gap-3 rounded-lg border-[#F5D37D] bg-[#3d444a]">
			<div
				className="flex p-8 py-4 items-center justify-between bg-[#31363f] rounded-t-[6px]"
				style={{ borderRadius: isActive ? "6px 6px 0px 0px" : "6px" }}
			>
				<div className="flex gap-2 items-center">
					<Avatar
						sx={{ bgcolor: "lightblue" }}
						{...nameLastnameAvatar(`${name} ${lastname}`)}
					/>
					<p className="font-medium text-md text-[#fff]">
						{name} {lastname}
					</p>
				</div>
				<div>
					<Button variant="contained" onClick={handleOnClick}>
						{isActive ? "SEND" : "Ask question"}
					</Button>
				</div>
			</div>
			{isActive ? (
				<>
					<div className="px-8 flex flex-col gap-2">
						<h1 className="text-[#fff] text-sm">Title</h1>
						<OutlinedInput
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="text-sm"
							sx={{
								width: "300px",
								height: "30px",
								borderRadius: "6px",
								fontSize: "14px",
								border: "1px solid white",
								color: "#fff"
							}}
							id="outlined-adornment-weight"
							inputProps={{
								"aria-label": "weight",
							}}
						/>
					</div>
					<div className="px-8 pb-8 flex flex-col gap-2">
						<h1 className="text-[#fff] text-sm">What are the details of your problem?</h1>
						<textarea
							value={content}
							style={{ resize: "none", background: "inherit", color: "#fff" }}
							onChange={(e) => setContent(e.target.value)}
							className="border border-[#f0f0f0] rounded-lg text-sm p-3"
						></textarea>
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	);
};

export default AskQuestion;
