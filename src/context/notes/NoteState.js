import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
	const s1 = {
		name: "Rishabh-The champion",
		class: "Mtech",
	};
	const [state, setState] = useState(s1);
	const update = () => {
		setTimeout(() => {
			setState({
				name: "Larry",
				class: "btech",
			});
		}, 1000);
	};
	return <NoteContext.Provider value={{ state, update }}>{props.children}</NoteContext.Provider>;
};
export default NoteState;
