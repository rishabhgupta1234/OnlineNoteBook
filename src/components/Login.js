import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

function Login() {
	const [user, setUser] = useState({ email: "", password: "" });
	const navigate = useNavigate();
	// const { loginUser } = useContext(noteContext);
	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch(`http://localhost:5001/api/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: user.email, password: user.password }),
		});

		const json = await response.json();
		console.log(json);
		if (json.success) {
			//Save the authtoken and redirect
			localStorage.setItem("token", json.authToken);
			navigate("/");
		} else {
			alert("Invalid credentials");
		}
	};
	return (
		<div>
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
