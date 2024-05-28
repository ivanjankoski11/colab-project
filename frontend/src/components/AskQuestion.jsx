import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";

const AskQuestion = ({name, lastname}) => {
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {

	}, [isActive]);

	return (
		<div className="border-2 flex flex-col gap-3 rounded-lg border-[#F5D37D]">
			<div
				className="flex p-8 py-4 items-center justify-between bg-[#FDF7E7] rounded-t-[6px]"
				style={{ borderRadius: isActive ? "6px 6px 0px 0px" : "6px" }}
			>
				<div className="flex gap-2 items-center">
					<Avatar sx={{ bgcolor: "red" }}>{name.charAt(0)}{lastname.charAt(0)}</Avatar>
					<p className="font-medium text-lg text-black-100">{name} {lastname}</p>
				</div>
				<div>
					<Button variant="contained" onClick={() => setIsActive(true)}>
						Ask question
					</Button>
				</div>
			</div>
			{isActive ? (
				<>
					<div className="px-8 flex flex-col gap-2">
						<h1>Title</h1>
						<OutlinedInput
							className="text-sm"
							sx={{ width: "300px", height: "30px", borderRadius: "6px", fontSize: "14px" }}
							id="outlined-adornment-weight"
							inputProps={{
								"aria-label": "weight",
							}}
						/>
					</div>
					<div className="px-8 pb-8 flex flex-col gap-2">
						<h1>What are the details of your problem?</h1>
						<textarea className="border-2 rounded-lg text-sm p-3"></textarea>
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	);
};

export default AskQuestion;
