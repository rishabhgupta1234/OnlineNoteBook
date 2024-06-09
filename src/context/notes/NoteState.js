import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
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

	const host = "http://localhost:5001";
	// const notesInitial = [];

	const [notes, setNotes] = useState([]);

	const getNotes = async () => {
		// TODO API Call

		const response = await fetch(`${host}/api/notes/fetchallnotes`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
				// "auth-token":
				// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NTMxNzYxYmVlNzE5MjIzYjRkNTc5In0sImlhdCI6MTcxNzkxMDc2Nn0.C776sI85iEbvpuB1XJ5_K8la7eUwO3Sknnp6CgB8cQg",
			},
		});
		const json = await response.json();

		// console.log(json);
		if (response.ok) {
			setNotes(json);
		} else {
			// console.log("no notes to display");
			setNotes([]);
		}
	};

	const addNote = async (title, description, tag) => {
		// TODO API Call

		const response = await fetch(`${host}/api/notes/addnote`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({ title, description, tag }),
		});

		const note = await response.json();

		setNotes(notes.concat(note));
		// return json;
	};
	const deleteNote = async (id) => {
		// TODO API Call

		const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
		});
		const json = await response.json();

		// console.log("Deleting the note with id ", id);
		const newNotes = notes.filter((note) => {
			return note._id !== id;
		});
		setNotes(newNotes);
		showAlert("Note deleted successfully", "success");
		return json;
	};
	const editNote = async (id, title, description, tag) => {
		// TODO API Call

		const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({ title, description, tag }),
		});

		const json = await response.json();

		// console.log("note is edited with id ", id);

		let newNotes = JSON.parse(JSON.stringify(notes));

		for (let index = 0; index < newNotes.length; index++) {
			const element = newNotes[index];

			if (element._id === id) {
				newNotes[index].title = title;
				newNotes[index].description = description;
				newNotes[index].tag = tag;
				break;
			}
		}
		setNotes(newNotes);
		return json;
	};

	return (
		<NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, showAlert, alert }}>
			{props.children}
		</NoteContext.Provider>
	);
};
export default NoteState;
