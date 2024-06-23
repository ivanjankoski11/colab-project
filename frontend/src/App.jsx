import { useContext, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Coding from "./pages/Coding";
import Register from "./pages/Register";

function App() {
	const { authUser } = useContext(AuthContext);
	const [value, setValue] = useState(0);

	return (
		<Routes>
			<Route path="/" element={authUser ? <Home value={value} setValue={setValue} /> : <Login />} />
			<Route path="/coding" element={<Coding />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>
	);
}

export default App;
