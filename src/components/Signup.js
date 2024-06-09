import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import alertContext from "../context/alert/alertContext";

function Signup() {
	const [user, setUser] = useState({ name: "", email: "", password: "", cpassword: "" });
	const { showAlert } = useContext(alertContext);
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch(`http://localhost:5001/api/auth/createuser`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: user.name, email: user.email, password: user.password }),
		});

		const json = await response.json();
		// console.log(json);

		if (json.success) {
			//Save the authtoken and redirect
			localStorage.setItem("token", json.authtoken);
			showAlert("Signup Successfull", "success");
			navigate("/");
		} else {
			showAlert("Invalid details", "warning");
		}
	};
	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className="container mt-2">
			<h2>Create an account to use iNoteBook</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<input
						type="text"
						className="form-control"
						id="name"
						name="name"
						value={user.name}
						aria-describedby="emailHelp"
						placeholder="Name"
						onChange={handleChange}
						minLength={3}
						required
					/>
				</div>
				<div className="mb-3">
					<input
						type="email"
						className="form-control"
						id="email"
						name="email"
						value={user.email}
						aria-describedby="emailHelp"
						placeholder="Email Address"
						onChange={handleChange}
						required
					/>
				</div>
				<div className="mb-3">
					<input
						type="password"
						className="form-control"
						id="password"
						name="password"
						value={user.password}
						placeholder="Password"
						onChange={handleChange}
						minLength={5}
						required
					/>
				</div>
				<div className="mb-3">
					<input
						type="password"
						className="form-control"
						id="cpassword"
						name="cpassword"
						value={user.cpassword}
						placeholder="Confirm Password"
						onChange={handleChange}
						minLength={5}
						required
					/>
				</div>

				<button type="submit" className="btn btn-primary">
					{" "}
					Submit
				</button>
			</form>
		</div>
	);
}

export default Signup;
