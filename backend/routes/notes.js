const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.json([]);
	res.send("Hello Notes");
});
module.exports = router;
