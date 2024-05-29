const connectToMongo = require("./db");
const express = require("express");
connectToMongo();

const app = express();
const port = 5001;

app.use(express.json()); // middle ware

// app.get("/", (req, res) => {
// 	res.send("Hello World!! India");
// });
// app.get("/api/v1/signup", (req, res) => {
// 	res.send("Hello SignUP");
// });
// app.get("/api/v1/login", (req, res) => {
// 	res.send("Hello Login");
// });
// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
	console.log("App listening on port number ", port);
});
