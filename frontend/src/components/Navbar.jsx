import React, { useContext, useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import Avatar from "@mui/material/Avatar";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { AuthContext } from "../providers/AuthContex";

const Navbar = ({open, setOpen}) => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	
	return (
		<div className="w-[100vw] border-b-2 sticky top-0 bg-[#FAFAFA]">
			<div className="w-[80%] m-auto  flex items-center justify-between">
				<div className="flex items-center p-2 gap-1 w-1/4">
					<img src="/images/logo.png" className="h-[50px]" />
					<h3 className="text-gray-700 text-2xl font-mono font-bold">Colab</h3>
				</div>
				<div className="w-1/2">
					<div>
						<OutlinedInput
							sx={{ width: "100%", height: "40px" }}
							placeholder="Search..."
							id="outlined-adornment-weight"
							endAdornment={
								<InputAdornment position="end">
									<Search />
								</InputAdornment>
							}
							aria-describedby="outlined-weight-helper-text"
							inputProps={{
								"aria-label": "weight",
							}}
						/>
					</div>
				</div>
				<div className="flex items-center gap-4 w-1/4 justify-end">
					<Button onClick={() => {
						// navigate("/coding");
						setOpen(true);
					}} variant="contained" color="success">
						Code session
					</Button>
					<Avatar sx={{ bgcolor: "red", letterSpacing: 2 }}>{`${user.name.charAt(0)}${user.lastname.charAt(
						0,
					)}`}</Avatar>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
