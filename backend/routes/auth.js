const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "Rishabh$is@agood*boy";

// Create a User using : POST "/api/auth/createuser"

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
			res.status(500).send("Some error occurred");
		}
	}
);
module.exports = router;
