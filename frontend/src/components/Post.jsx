import React from 'react'
import Avatar from "@mui/material/Avatar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from '@mui/material';
import SendIcon from "@mui/icons-material/Send";
import Comment from './Comment';

const Post = ({ post }) => {
	const { text, title, upVotes, downVotes, user, comments } = post;
  return (
		<div className="flex flex-col gap-3 border-2 mt-5 w-[100%]">
			<div className="flex gap-2 items-center px-8 py-4 bg-[#FAFAFA]">
				<Avatar sx={{ bgcolor: "lightblue" }}>
					{user.name.charAt(0)}
					{user.lastname.charAt(0)}
				</Avatar>
				<p className="font-medium text-lg text-black-100">
					{user.name} {user.lastname}
				</p>
			</div>
			<div className="p-8 pt-0 pb-0 flex flex-col gap-2">
				<h3 className="text-lg font-semibold text-[#333]">{title}</h3>
				<p className="text-sm text[#333]">{text}</p>
			</div>
			<div className="px-8 py-2 flex">
				<div className="flex items-center gap-2 pl-2">
					<div className="flex flex-col items-center gap-1">
						<CheckCircleIcon sx={{ color: "green", opacity: 0.8, fontSize: "40px" }} />
						<p className="text-sm text-[#333]">{upVotes}</p>
					</div>
					<div className="flex flex-col items-center gap-1">
						<CancelIcon sx={{ color: "LIGHTGRAY", fontSize: "40px" }} />
						<p className="text-sm text-[#333]">{downVotes}</p>
					</div>
				</div>
			</div>
			<div className='px-8'>
				<div className="bg-[#FAFAFA]">
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
			<div className="px-8 py-2 pb-8 w-[100%] flex items-center gap-2">
				<textarea
					style={{ resize: "none", width: "100%" }}
					className="border-2 rounded-lg text-sm p-3 rezize-none"
					placeholder="Write your opinion..."
				></textarea>
				<Button variant="contained" sx={{ borderRadius: "20px", padding: "5px" }}>
					<SendIcon />
				</Button>
			</div>
		</div>
	);
}

export default Post