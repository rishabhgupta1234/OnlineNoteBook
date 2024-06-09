import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

function Login() {
	const host = "http://localhost:5001";
	const [user, setUser] = useState({ email: "", password: "" });
	const navigate = useNavigate();

	const { showAlert } = useContext(noteContext);
	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log("handleSubmit is called");
		const response = await fetch(`${host}/api/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: user.email, password: user.password }),
		});

		const json = await response.json();
		// console.log(json);
		if (json.success) {
			//Save the authtoken and redirect
			// console.log("login success");
			localStorage.setItem("token", json.authtoken);
			showAlert("Login Successfull", "success");
			navigate("/");
		} else {
			showAlert("Invalid user credentials", "warning");
		}
	};
	return (
		<div className="mt-2">
			<h2>Login to continue to iNoteBook</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group my-2">
					<input
						type="email"
						className="form-control"
						id="email"
						name="email"
						value={user.email}
						onChange={handleChange}
						aria-describedby="emailHelp"
						placeholder="Enter email"
						required
					/>
				</div>
				<div className="form-group my-2">
					<input
						type="password"
						className="form-control"
						id="password"
						name="password"
						value={user.password}
						onChange={handleChange}
						placeholder="Password"
						required
					/>
				</div>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
}

export default Login;
