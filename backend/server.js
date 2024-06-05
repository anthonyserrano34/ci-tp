import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const app = express();
const db = new sqlite3.Database(":memory:");
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(bodyParser.json());
app.use(cors());

db.serialize(() => {
	db.run(
		"CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)"
	);
});

const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

const generateToken = (id) => {
	return jwt.sign({ id }, SECRET_KEY, { expiresIn: "1h" });
};

app.post("/api/register", async (req, res) => {
	const { username, password } = req.body;
	const hashedPassword = await hashPassword(password);
	db.run(
		"INSERT INTO users (username, password) VALUES (?, ?)",
		[username, hashedPassword],
		function (err) {
			if (err) {
				return res.status(500).json({ error: err.message });
			}
			const token = generateToken(this.lastID);
			res.json({ id: this.lastID, token });
		}
	);
});

app.post("/api/login", (req, res) => {
	const { username, password } = req.body;
	db.get(
		"SELECT * FROM users WHERE username = ?",
		[username],
		async (err, user) => {
			if (err) {
				return res.status(500).json({ error: err.message });
			}
			if (!user || !(await bcrypt.compare(password, user.password))) {
				return res
					.status(400)
					.json({ error: "Invalid username or password" });
			}
			const token = generateToken(user.id);
			res.json({ message: "Login successful", token });
		}
	);
});

app.delete("/api/account", (req, res) => {
	const { id } = req.body;
	db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json({ message: "Account deleted successfully" });
	});
});

app.get("/api/ping", (req, res) => {
	res.json({ message: "Ping successful" });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

export default app;