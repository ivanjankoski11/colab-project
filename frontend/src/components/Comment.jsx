import React from 'react'

const Comment = ({name, lastname, text, createdAt}) => {
  return (
		<div className="p-3 px-5 flex flex-col gap-2 bg-[#2d333b] rounded-lg">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<p className="text-sm text-[#fff]">{name + " " + lastname}</p>
				</div>
				<div className="flex flex-col gap-3 text-sm text-[#c5cfd8]">
					<p className="text-xs">{createdAt.slice(0, 10).replace(/-/g, "/")}</p>
				</div>
			</div>
			<div className="px-2 text-[#c5cfd8]">
				<p className="text-sm">{text}</p>
			</div>
		</div>
	);
}

export default Comment