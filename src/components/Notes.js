import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/alert/alertContext";
import userContext from "../context/user/userContext";

function Notes() {
	const context = useContext(noteContext);
	const { notes, getNotes, editNote } = context;
	const { showAlert } = useContext(alertContext);
	const { UserInfo } = useContext(userContext);
	const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });
	const ref = useRef(null);
	const refClose = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			getNotes();
			UserInfo();
		} else {
			navigate("/login");
		}
	}, []);
	// useEffect(() => {
	// 	console.log("useEffect note ", note);
	// }, [note]);
	const updateNote = (currentNote) => {
		ref.current.click();
		setNote({
			id: String(currentNote._id),
			etitle: currentNote.title,
			edescription: currentNote.description,
			etag: currentNote.tag,
		});
		// console.log("updateNode note", note);
	};

	const handleClick = (e) => {
		// console.log("handleClick note", note);
		editNote(note.id, note.etitle, note.edescription, note.etag);
		refClose.current.click();
		showAlert("Note updated successfully", "success");
	};
	const onChange = (e) => {
		setNote({
			...note,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<>
			<AddNote />
			<button
				type="button"
				ref={ref}
				className="btn btn-primary d-none"
				data-bs-toggle="modal"
				data-bs-target="#exampleModal">
				Launch demo modal
			</button>
			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Edit Note
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="mb-3">
									<input
										type="text"
										className="form-control"
										id="etitle"
										name="etitle"
										value={note.etitle}
										onChange={onChange}
										placeholder="Enter title"
										minLength={5}
										required
									/>
								</div>
								<div className="form-group my-2">
									<textarea
										className="form-control"
										id="edescription"
										name="edescription"
										value={note.edescription}
										rows="3"
										onChange={onChange}
										placeholder="Enter description"
										minLength={5}
										required
									/>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">
								Close
							</button>
							<button
								disabled={note.etitle.length < 5 || note.edescription.length < 5}
								type="button"
								className="btn btn-primary"
								onClick={handleClick}>
								Update Note
							</button>
						</div>
					</div>
				</div>
			</div>

			{
				<div className="container row my-3">
					{notes.length === 0 ? <h2>No notes to display</h2> : <h2>Your Notes</h2>}
					{notes.map((note) => {
						return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
					})}
				</div>
			}
		</>
	);
}

export default Notes;
