import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
	const host = "http://localhost:5001";
	const notesInitial = [];

	const [notes, setNotes] = useState(notesInitial);

	const getNotes = async () => {
		// TODO API Call

		const response = await fetch(`${host}/api/notes/fetchallnotes`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1NzUyOGQzMmQ1MjlhMzFjMjVkY2JkIn0sImlhdCI6MTcxNjk5OTEwNn0.CkuWYIn4TKMo6u7f1utL-gm4J_0yEflo-vCLpEUEmCs",
			},
		});
		const json = await response.json();

		console.log(json);
		setNotes(json);
	};

	const addNote = async (title, description, tag) => {
		// TODO API Call

		const response = await fetch(`${host}/api/notes/addnote`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1NzUyOGQzMmQ1MjlhMzFjMjVkY2JkIn0sImlhdCI6MTcxNjk5OTEwNn0.CkuWYIn4TKMo6u7f1utL-gm4J_0yEflo-vCLpEUEmCs",
			},
			body: JSON.stringify({ title, description, tag }),
		});

		const json = await response.json();

		console.log("adding a new node");
		// const note = {
		// 	id: "6657d92773856dd1644178831",
		// 	user: "6657528d32d529a31c25dcbd",
		// 	title: title,
		// 	description: description,
		// 	tag: tag,
		// 	date: "2024-05-30T01:40:55.477Z",
		// 	__v: 0,
		// };
		const note = json;
		setNotes(notes.concat(note));
		return json;
	};
	const deleteNote = (id) => {
		// TODO API Call

		console.log("Deleting the note with id ", id);
		const newNotes = notes.filter((note) => {
			return note._id !== id;
		});
		setNotes(newNotes);
	};
	const editNote = async (id, title, description, tag) => {
		// TODO API Call

		const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1NzUyOGQzMmQ1MjlhMzFjMjVkY2JkIn0sImlhdCI6MTcxNjk5OTEwNn0.CkuWYIn4TKMo6u7f1utL-gm4J_0yEflo-vCLpEUEmCs",
			},
			body: JSON.stringify({ title, description, tag }),
		});

		const json = await response.json();

		console.log("note is edited with id ", id);

		for (let index = 0; index < notes.length; index++) {
			const element = notes[index];

			if (element._id === id) {
				element.title = title;
				element.description = description;
				element.tag = tag;
			}
		}
		return json;
	};

	return (
		<NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
			{props.children}
		</NoteContext.Provider>
	);
};
export default NoteState;
