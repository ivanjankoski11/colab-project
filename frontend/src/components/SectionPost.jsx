import React from "react";

const SectionPost = ({ title, content }) => {
	return (
		<div className="flex flex-col border-2 border-[#F5D37D] w-[100%] rounded-lg">
			<div className="bg-[#FBECC6] p-2">
				<p className="text-sm font-bold">{title}</p>
			</div>
			<div className="flex flex-col text-sm p-2 gap-2 bg-[#FDF7E7]">
                {
                    content.map((con) => {
                        return (
                            <p>{con}</p>
                        )
                    })
                }
			</div>
		</div>
	);
};

export default SectionPost;
