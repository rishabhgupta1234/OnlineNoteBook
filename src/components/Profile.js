import React, { useEffect, useState } from "react";

function Profile() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const UserInfo = async () => {
		const response = await fetch("http://localhost:5001/api/auth/getUser", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
		});

		const json = await response.json();
		console.log(json);

		if (response.ok) {
			setName(json.name);
			setEmail(json.email);
		}
	};
	useEffect(() => {
		UserInfo();
	}, []);

	return (
		<div className="container">
			<div className="user-info">
				<h2>User Information</h2>
				<p>
					<strong>Name:</strong> {name}
				</p>
				<p>
					<strong>Email:</strong> {email}
				</p>
			</div>
		</div>
	);
}

export default Profile;
