import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import alertContext from "../context/alert/alertContext";
export default function AddNote() {
	const context = useContext(noteContext);
	const { addNote } = context;
	const { showAlert } = useContext(alertContext);

	const [note, setNote] = useState({ title: "", description: "", tag: "default" });

	const handleSubmit = (e) => {
		e.preventDefault();
		addNote(note.title, note.description, note.tag);
		setNote({
			title: "",
			description: "",
			tag: "default",
		});
		showAlert("Note added successfully", "success");
	};
	const onChange = (e) => {
		setNote({
			...note,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div>
			<div className="container my-3">
				<h2>Add a Note</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<input
							type="text"
							className="form-control"
							id="title"
							name="title"
							value={note.title}
							onChange={onChange}
							placeholder="Enter title"
							minLength={5}
							required
						/>
					</div>
					<div className="form-group my-2">
						<textarea
							className="form-control"
							id="description"
							name="description"
							value={note.description}
							rows="3"
							onChange={onChange}
							placeholder="Enter description"
							minLength={5}
							required
						/>
					</div>

					<button
						disabled={note.title.length < 5 || note.description.length < 5}
						type="submit"
						className="btn btn-primary">
						Add note
					</button>
				</form>
			</div>
		</div>
	);
}
