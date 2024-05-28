const mongoose = require("mongoose");

const mongoURI =
	// "mongodb://127.0.0.1:27017/shell?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1";
	"mongodb://127.0.0.1:27017/inotebook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1";

const connectToMongo = () => {
	mongoose
		.connect(mongoURI)
		.then(() => {
			console.log("Connected to Mongo Successfully");
		})
		.catch(() => {
			console.log("ERROR occurred while connection to Mongo DB");
		});
	// mongoose.connect(mongoURI, () => {
	// 	console.log("Connected to Mongo Successfully");
	// });
};

module.exports = connectToMongo;
