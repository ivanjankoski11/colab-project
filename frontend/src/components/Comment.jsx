import React from 'react'
import Avatar from "@mui/material/Avatar";

const Comment = ({name, lastname, text, createdAt}) => {
  return (
		<div className="p-5 flex flex-col gap-3">
			<div className='flex items-center gap-3'>
				<Avatar sx={{ bgcolor: "lightblue" }}>
					{name.charAt(0)}
					{lastname.charAt(0)}
				</Avatar>
				<h1>{name + " " + lastname}</h1>
			</div>
			<div className="flex flex-col gap-3">
				<p>{text}</p>
				<h3>{createdAt}</h3>
			</div>
		</div>
	);
}

export default Comment