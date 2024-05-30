const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Rishabh$is@agood*boy";

// ENDPOINT -1 Create a User using : POST "/api/auth/createuser"

router.post(
	"/createuser",
	[
		body("name", "Enter a valid name").isLength({ min: 3 }),
		body("email", "Enter a valid email").isEmail(),
		body("password", "Password must be atleast 5 characters long").isLength({ min: 5 }),
	],
	async (req, res) => {
		// If there are errors,return Bad request and the errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			let user = await User.findOne({ email: req.body.email });
			console.log(user);
			if (user) {
				return res.status(400).json({ error: "Sorry a user with this email already exists" });
			}
			const salt = await bcrypt.genSalt(10);
			const secPassword = await bcrypt.hash(req.body.password, salt);
			// check whether the user with this email exists already
			user = await User.create({
				name: req.body.name,
				password: secPassword,
				email: req.body.email,
			});

			const data = {
				user: {
					id: user.id,
				},
			};
			const authToken = jwt.sign(data, JWT_SECRET);
			console.log(authToken);
			res.json({ authToken: authToken });
		} catch (error) {
			console.log(error.message);
			res.status(500).send("Internal server error occurred");
		}
	}
);

// ENDPOINT -2 Authenticate a User using : POST "/api/auth/login"

router.post(
	"/login",
	[body("email", "Enter a valid email").isEmail(), body("password", "Password cannot be blank").exists()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email: email });
			// console.log(user);
			if (!user) {
				return res.status(400).json({ error: "Please try to login with correct credentials" });
			}
			const passwordCompare = await bcrypt.compare(password, user.password);

			if (!passwordCompare) {
				return res.status(400).json({ error: "Please try to login with correct credentials" });
			}
			console.log("passwordCompare ", passwordCompare);
			const payload = {
				user: {
					id: user.id,
				},
			};
			console.log(user);
			const authtoken = jwt.sign(payload, JWT_SECRET);
			console.log("authtoken ", authtoken);
			res.json({ authtoken: authtoken });
		} catch (error) {
			res.status(500).send("Internal server error occurred");
		}
	}
);

// ENDPOINT -3 Get logged in User details : POST "/api/auth/getUser"

router.post("/getUser", fetchuser, async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId).select("-password");
		res.send(user);
	} catch (error) {
		res.status(500).send("Internal server error occurred");
	}
});

module.exports = router;
