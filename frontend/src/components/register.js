import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");
		setSuccess("");

		try {
			const response = await axios.post("http://localhost:5000/api/register", {
				username,
				password,
			});
			setSuccess("Registration successful!");
			setUsername("");
			setPassword("");
		} catch (error) {
			setError("Registration failed. Please try again.");
		}
	};

	return (
		<div>
			<h2>Register</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Username:</label>
					<input
						id="username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div>
					<p>
						<Link to="/login">Login</Link>
					</p>
				</div>
				{error && <p style={{ color: "red" }}>{error}</p>}
				{success && <p style={{ color: "green" }}>{success}</p>}
				<button type="submit">Register</button>
			</form>
		</div>
	);
}

export default Register;
