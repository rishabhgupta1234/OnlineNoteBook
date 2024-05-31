import React, { useEffect } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const About = () => {
	const a = useContext(noteContext);
	useEffect(() => {
		a.update();
	}, []);
	return (
		<div>
			<h1>
				this is about {a.state.name} and he is in class of {a.state.class}
			</h1>
		</div>
	);
};

export default About;
