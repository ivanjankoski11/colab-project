import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import DialogCoding from "../components/CodingDialog";
import Section from "../components/Sections";
import SectionPost from "../components/SectionPost";

export const Home = ({value, setValue}) => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	return (
		<div className="h-[100vh] flex flex-col bg-[#2e3235]" style={{ overflowY: "hidden" }}>
			<DialogCoding open={open} setOpen={setOpen} />
			<Navbar setOpen={setOpen} value={value} setValue={setValue} />
			<div className="h-[100%] flex w-[80vw] m-auto sticky top-0">
				<div className="w-3/4">
					<Section value={value} setValue={setValue} />
				</div>
				<div className="w-1/4 pt-10 flex flex-col gap-4 pl-5">
					<SectionPost
						title={"The Colab Blog"}
						content={[
							"Is AI make your code worse?",
							"Data is more powerful then ever",
						]}
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
