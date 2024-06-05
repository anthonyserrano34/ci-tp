import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../logo.svg';

const Status = () => {
	const isAuthenticated = localStorage.getItem("jwtToken");
	const navigate = useNavigate();
	return (
		<div>
			<img src={logo} className="logo" alt="logo" height={100} width={100}/>
			<h2>Status</h2>
			{isAuthenticated ? (
				<>
					<p id="authStatus">You are logged in.</p>
					<button onClick={() => {
						localStorage.removeItem("jwtToken");
						navigate("/login");
					}}>
						Logout
					</button>
				</>
			) : (
				<>
					<p id="authStatus">You are not logged in.</p>
					<button onClick={() => navigate("/login")}>Login</button>
				</>
			)}
		</div>
	);
};

export default Status;
