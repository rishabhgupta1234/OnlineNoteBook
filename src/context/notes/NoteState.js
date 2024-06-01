import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
	const notesInitial = [
		{
			_id: "6657d88713c7d757b07589de",
			user: "6657528d32d529a31c25dcbd",
			title: "Physics assignment",
			description: "Related to end exams",
			tag: "study",
			date: "2024-05-30T01:38:15.754Z",
			__v: 0,
		},
		{
			_id: "6657d8c3b42c3c30cb839365",
			user: "6657528d32d529a31c25dcbd",
			title: "Chemistry assignment",
			description: "Related to mid exams",
			tag: "study",
			date: "2024-05-30T01:39:15.111Z",
			__v: 0,
		},
		{
			_id: "6657d8e0fea1c633335e32f6",
			user: "6657528d32d529a31c25dcbd",
			title: "Chemistry assignment",
			description: "Related to mid exams",
			tag: "General",
			date: "2024-05-30T01:39:44.732Z",
			__v: 0,
		},
		{
			_id: "6657d92773856dd164417883",
			user: "6657528d32d529a31c25dcbd",
			title: "SNS assignment",
			description: "Related to mid exams",
			tag: "General",
			date: "2024-05-30T01:40:55.477Z",
			__v: 0,
		},
	];

	const [notes, setNotes] = useState(notesInitial);

	return <NoteContext.Provider value={{ notes, setNotes }}>{props.children}</NoteContext.Provider>;
};
export default NoteState;
