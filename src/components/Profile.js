import React, { useContext, useEffect, useState } from "react";
import userContext from "../context/user/userContext";
import { useNavigate } from "react-router-dom";

function Profile() {
	const { name, email } = useContext(userContext);
	const navigate = useNavigate();
	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/login");
		}
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
