import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userContext from "../context/user/userContext";

const Navbar = () => {
	let location = useLocation();
	const navigate = useNavigate();
	const { name } = useContext(userContext);
	// useEffect(() => {
	// 	// console.log(location.pathname);
	// }, [location]);

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};
	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">
						iNoteBook
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link
									className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
									aria-current="page"
									to="/">
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
									to="/about">
									About
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`}
									aria-current="page"
									to="/profile">
									User Profile
								</Link>
							</li>
						</ul>
						<form className="d-flex" role="search">
							{!localStorage.getItem("token") ? (
								<form className="d-flex">
									<Link className="btn btn-primary mx-1" to="/login" role="button">
										Login
									</Link>
									<Link className="btn btn-primary" to="/signup" role="button">
										Signup
									</Link>
								</form>
							) : (
								<>
									<Link className="navbar-brand" to="/">
										Hi {name.split(" ")[0]}
									</Link>
									<button className="btn btn-primary" onClick={handleLogout}>
										Logout
									</button>
								</>
							)}
						</form>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
