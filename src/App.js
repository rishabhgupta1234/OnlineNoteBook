import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import { useContext } from "react";
import noteContext from "./context/notes/noteContext";
function App() {
	const { alert } = useContext(noteContext);
	return (
		<>
			<Router>
				<Navbar />
				<Alert alert={alert} />
				<div className="container">
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/about" element={<About />} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/signup" element={<Signup />} />
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default App;
