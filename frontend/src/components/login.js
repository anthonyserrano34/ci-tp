import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await axios.post("http://localhost:5000/api/login", {
                username,
                password,
            });
            const token = response.data.token;
            localStorage.setItem("jwtToken", token);
            setSuccess("Login successful!");
            setUsername("");
            setPassword("");
        } catch (error) {
            setError("Login failed.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
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
                        <Link to="/register">Register</Link>
                    </p>
					<p>
                        <Link to="/">Check login status</Link>
                    </p>
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
