import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
function App() {
	return (
		<>
			<NoteState>
				<Router>
					<Navbar />
					<Alert message="this is alert" />
					<div className="container">
						<Routes>
							<Route exact path="/" element={<Home />} />
							<Route exact path="/about" element={<About />} />
						</Routes>
					</div>
				</Router>
			</NoteState>
		</>
	);
}

export default App;
