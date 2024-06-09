const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE -1 Get all notes using  : GET "/api/notes/fetchallnotes" Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
	try {
		const notes = await Note.find({ user: req.user.id });

		res.json(notes);
	} catch (error) {
		// console.log(error.message);
		res.status(500).send("Internal error occurred");
	}
});

// ROUTE -2 Create a note using  : POST "/api/notes/addnote" Login required
router.post(
	"/addnote",
	fetchuser,
	[
		body("title", "Title must be atleast 3 characters long").isLength({ min: 3 }),
		body("description", "Description must be atleast 5 characters long").isLength({ min: 5 }),
	],
	async (req, res) => {
		const { title, description, tag } = req.body;
		// If there are errors,return Bad request and the errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const note = await Note.create({
				user: req.user.id,
				title: title,
				description: description,
			});
			return res.json(note);
		} catch (error) {
			// console.log(error.message);
			res.status(500).send("Internal error occurred");
		}
	}
);

// ROUTE -3 Update a note using  : PUT "/api/notes/updatenote" Login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
	const { title, description, tag } = req.body;
	try {
		const newNote = {};
		if (title) {
			newNote.title = title;
		}
		if (description) {
			newNote.description = description;
		}
		if (tag) {
			newNote.tag = tag;
		}
		let note = await Note.findById(req.params.id);
		if (!note) {
			return res.status(404).send("Not found");
		}
		if (note.user.toString() !== req.user.id) {
			return res.status(401).send("Not allowed to update");
		}
		note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
		res.json({ note });
	} catch (error) {
		// console.log(error.message);
		res.status(500).send("Internal error occurred");
	}
});

// ROUTE -4 Delete a note using  : Delete "/api/notes/addnote" Login requited
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
	try {
		let note = await Note.findById(req.params.id);
		if (!note) {
			return res.status(404).send("Not found");
		}
		// Allow deletion only if user owns this Note
		if (note.user.toString() !== req.user.id) {
			return res.status(401).send("Not allowed to delete");
		}
		note = await Note.findByIdAndDelete(req.params.id);
		// console.log(note);
		res.json({ Success: "Note has been deleted", note: note });
	} catch (error) {
		// console.log(error.message);
		res.status(500).send("Internal error occurred");
	}
});

module.exports = router;
