import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Status from "./components/status";

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<Status />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
