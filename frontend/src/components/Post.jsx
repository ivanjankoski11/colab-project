import React, { useState } from 'react'
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import Comment from './Comment';
import { nameLastnameAvatar } from '../utils/stringToColor';
import { OutlinedInput, InputAdornment, Avatar } from "@mui/material";
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useDataContext } from '../context/DataContext';

const Post = ({ post }) => {
	const { text, title, upVotes, downVotes, user, comments, id } = post;
	const { authUser } = useAuthContext();
	const [comment, setComment] = useState("");
	const { setCommentAdded } = useDataContext();

	const handleCreateComment = async () => {
		if (comment !== "") {
			try {
				const response = await axios.post("http://localhost:3001/comments", {
					email: authUser.username,
					postId: id,
					text: comment
				});
				console.log(response);
				setCommentAdded(comment);
			} catch (err) {
				console.log(err);
			}
		}
	}

  return (
		<div className="flex flex-col gap-3 border-2 border-[#002029] bg-[#3d444a] mt-5 w-[100%] rounded-lg">
			<div className="flex gap-2 items-center px-8 py-4 bg-[#31363F] rounded-t-lg">
				<Avatar {...nameLastnameAvatar(`${user.name} ${user.lastname}`)} />
				<p className="font-medium text-md text-[#fff] ">
					{user.name} {user.lastname}
				</p>
			</div>
			<div className="p-8 pt-0 pb-0 flex flex-col gap-2">
				<h3 className="text-lg font-semibold text-[#fff]">{title}</h3>
				<p className="text-sm text-[#c5cfd8]">{text}</p>
			</div>
			<div className="px-8 flex">
				<div className="flex items-center gap-2 pl-2">
					<div className="flex flex-col items-center gap-1">
						<CheckCircleIcon
							sx={{ color: "green", opacity: 0.8, fontSize: "25px" }}
						/>
						<p className="text-sm text-[#c5cfd8]">{upVotes}</p>
					</div>
					<div className="flex flex-col items-center gap-1">
						<CancelIcon sx={{ color: "LIGHTGRAY", fontSize: "25px" }} />
						<p className="text-sm text-[#c5cfd8]">{downVotes}</p>
					</div>
				</div>
			</div>
			<div className="px-8">
				<div className="flex flex-col gap-2">
					{comments.map((comment) => {
						return (
							<Comment
								name={comment.user.name}
								lastname={comment.user.lastname}
								text={comment.text}
								createdAt={comment.createdAt}
							/>
						);
					})}
				</div>
			</div>
			<div className="px-8 pb-8 w-[100%] gap-2">
			  <OutlinedInput
				  onChange={(e) => setComment(e.target.value)}
					sx={{
						width: "100%",
						height: "40px",
						border: "1px solid #9e9e9e",
						color: "white",
						fontSize: "12px",
					}}
					placeholder="Write a comment..."
					id="outlined-adornment-weight"
					endAdornment={
						<InputAdornment position="end">
							<div onClick={handleCreateComment}>
								<SendIcon sx={{ color: "#fff", cursor: "pointer" }} />
							</div>
						</InputAdornment>
					}
					aria-describedby="outlined-weight-helper-text"
					inputProps={{
						"aria-label": "weight",
					}}
				/>
			</div>
		</div>
	);
}

export default Post