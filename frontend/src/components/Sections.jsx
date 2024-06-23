import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Home from "@mui/icons-material/Home";
import Person from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AskQuestion from "../components/AskQuestion";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import Users from "../pages/Users";
import SearchPage from "../pages/Search";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useSocketContext } from "../context/WebSocketContext";
import { useDataContext } from "../context/DataContext";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			style={{ width: "100%", overflowY: "scroll", height: "100%" }}
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	};
}

export default function Section({ value, setValue }) {
	const { posts } = useDataContext();
	const navigate = useNavigate();
	const { authUser } = useAuthContext();
	const { socket } = useSocketContext();

	const handleChange = (event, newValue) => {
		console.log(newValue);
		setValue(newValue);
	};

	const logOut = () => {
		localStorage.removeItem("authUser");
		if (socket) {
			socket.disconnect();
		}
		navigate("/login");
	};

	return (
		<Box
			sx={{
				flexGrow: 1,
				display: "flex",
				justifyContent: "center",
				height: "100%",
				width: "100%",
				margin: "auto",
			}}
		>
			<div></div>
			<Tabs
				indicatorColor="red"
				orientation="vertical"
				value={value}
				onChange={handleChange}
				sx={{
					paddingTop: "20px",
					paddingRight: "30px",
					borderRight: 1,
					borderColor: "#5c5c5c",
					"& .MuiTab-label": {
						textTransform: "none", // Prevent text transformation to uppercase
					},
				}}
			>
				<Tab
					label={
						<div
							className="flex items-center justify-start gap-2 rounded-lg px-5 py-2"
							style={{
								backgroundColor: value === 0 ? "#3d444a" : "inherit",
								textTransform: "none",
							}}
						>
							<Home sx={{ color: "#dbdbdb" }} />
							<p className="text-[#dbdbdb]">Home</p>
						</div>
					}
					{...a11yProps(0)}
					selected={value === 0}
					sx={{
						fontSize: "13px",
					}}
				/>
				<Tab
					label={
						<div
							className="flex items-center justify-start gap-2 rounded-lg px-5 py-2"
							style={{
								backgroundColor: value === 1 ? "#3d444a" : "inherit",
								textTransform: "none",
							}}
						>
							<Person sx={{ color: "#dbdbdb" }} />
							<p className="text-[#dbdbdb]">Users</p>
						</div>
					}
					{...a11yProps(1)}
					selected={value === 1}
					sx={{
						fontSize: "13px",
					}}
				/>
				<Button
					sx={{ position: "fixed", bottom: "30px", marginLeft: "10px" }}
					variant="contained"
					onClick={() => logOut()}
					startIcon={<LogoutOutlinedIcon />}
				>
					Logut
				</Button>
			</Tabs>
			<TabPanel value={value} index={0}>
				<div className="px-8 mb-5" style={{ marginBottom: "100px" }}>
					<AskQuestion name={authUser.name} lastname={authUser.lastname} />
					{posts.map((post) => {
						return <Post post={post} />;
					})}
				</div>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Users />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<SearchPage />
			</TabPanel>
		</Box>
	);
}
