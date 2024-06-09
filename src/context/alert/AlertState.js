import React from "react";
import alertContext from "./alertContext";
import { useState } from "react";

function AlertState(props) {
	const [alert, setAlert] = useState(null);
	const showAlert = (message, type) => {
		setAlert({
			msg: message,
			type: type,
		});
		setTimeout(() => {
			setAlert(null);
		}, 3000);
	};
	return (
		<div>
			<alertContext.Provider value={{ showAlert }}>{props.children}</alertContext.Provider>
		</div>
	);
}

export default AlertState;
