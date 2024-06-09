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

import alertContext from "./context/alert/alertContext";
import Profile from "./components/Profile";
function App() {
	const { alert } = useContext(alertContext);
	return (
		<>
			<NoteState>
				<Router>
					<Navbar />
					<Alert alert={alert} />
					<div className="container">
						<Routes>
							<Route exact path="/" element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/profile" element={<Profile />} />
						</Routes>
					</div>
				</Router>
			</NoteState>
		</>
	);
}

export default App;
