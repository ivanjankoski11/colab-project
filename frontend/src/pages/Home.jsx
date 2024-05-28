import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthContex";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import io, { connect } from "socket.io-client";
import Section from "../components/Sections";
import SectionPost from "../components/SectionPost";
import DialogCoding from "../components/CodingDialog";

const Home = ({ handleLogout }) => {
	const { token, loading, socket } = useContext(AuthContext);
	const [open, setOpen] = useState(false);

	if (loading) {
		return null;
	}
	if (!token) {
		return <Navigate to="/login" replace />;
	}
	

	return (
		<div className="h-[100vh] flex flex-col" style={{ overflowY: "hidden" }}>
			<DialogCoding open={open} setOpen={setOpen} socket={socket} />
			<Navbar open={open} setOpen={setOpen} socket={socket} />
			<div className="h-[100%] flex w-[80vw] m-auto sticky top-0">
				<div className="w-3/4">
					<Section handleLogout={handleLogout} />
				</div>
				<div className="w-1/4 pt-10 flex flex-col gap-3 pl-5">
					<SectionPost
						title={"The Colab Blog"}
						content={["Is AI make your code worse?", "Data is more powerful then ever"]}
					/>
					<SectionPost
						title={"Featured on Meta"}
						content={[
							"Changing how community leadership works on Stack Exchange: a proposal and...",
							"2024 Community Moderator Election Results",
							"Temporary policy: Generative AI (e.g., ChatGPT) is banned",
						]}
					/>
					<SectionPost
						title={"Hot Meta Posts"}
						content={[
							"Should suggested edits which add comments to code be accepted?",
							"Use of GenAI claiming it's to compensate for disability",
						]}
					/>
				</div>
			</div>
		</div>
	);
};

export default Home;
