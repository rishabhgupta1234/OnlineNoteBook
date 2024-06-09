import React from "react";
import userContext from "./userContext";
import { useState, useEffect } from "react";

function UserState(props) {
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
		<div>
			<userContext.Provider value={{ name, email, UserInfo }}>{props.children}</userContext.Provider>
		</div>
	);
}

export default UserState;
