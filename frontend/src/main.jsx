import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/WebSocketContext.jsx";
import { DataContextProvider } from "./context/DataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<AuthContextProvider>
			<DataContextProvider>
				<SocketContextProvider>
					<React.StrictMode>
					<App />
					</React.StrictMode>
				</SocketContextProvider>
			</DataContextProvider>
		</AuthContextProvider>
	</BrowserRouter>
);
