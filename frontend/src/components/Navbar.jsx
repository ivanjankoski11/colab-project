import React, { useState } from 'react'
import { OutlinedInput, InputAdornment, Button, Avatar } from '@mui/material';
import Search from "@mui/icons-material/Search";
import { useAuthContext } from '../context/AuthContext';
import { nameLastnameAvatar } from '../utils/stringToColor';
import { useDataContext } from '../context/DataContext';

const Navbar = ({ setOpen, value, setValue }) => {
	const { authUser } = useAuthContext();
	const { search } = useDataContext();
	const [query, setQuery] = useState("");

	const handleSearch = async (e) => {
		await search(e.target.value);
		setValue(2);
	}

  return (
		<div className="w-[100vw] bg-[#2e3235] border-b-2 border-[#5c5c5c] sticky top-0">
			<div className="w-[80%] m-auto  flex items-center justify-between">
				<div className="flex items-center p-2 gap-1 w-1/4">
					<img src="/images/logo.png" className="h-[50px]" />
					<h3 className="text-[#fff] text-2xl font-mono font-bold">Colab</h3>
				</div>
				<div className="w-1/2">
					<div>
						<OutlinedInput
							sx={{
								width: "100%",
								height: "40px",
								border: "1px solid #9e9e9e",
								color: "white",
						  }}
						  onChange={handleSearch}
							placeholder="Search..."
							id="outlined-adornment-weight"
							endAdornment={
								<InputAdornment position="end">
									<Search sx={{ color: "#fff" }} />
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
					<Button
						onClick={() => {
							// navigate("/coding");
							setOpen(true);
						}}
						variant="contained"
						color="success"
					>
						Code session
					</Button>
					<Avatar
						sx={{ bgcolor: "lightblue" }}
						{...nameLastnameAvatar(`${authUser.name} ${authUser.lastname}`)}
					/>
				</div>
			</div>
		</div>
	);
}

export default Navbar