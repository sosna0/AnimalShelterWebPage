import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top border-bottom shadow">
			<div className="container">

				{/* Brand section with logo and name */}
				<div className="d-flex align-items-center">
					<Link className="navbar-brand d-flex align-items-center" to="/">
						<img
							src="icons/logo256.png"
							alt="Shelter Logo"
							height="40"
							className="d-inline-block align-text-top me-2"
						/>
						<span>Animal Shelter</span>
					</Link>
				</div>

				{/* Navbar toggler for small screens */}
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				{/* Navbar links */}
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<Link className="nav-link" to="/">Home</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/animals">Our Animals</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/findanimal">Find Your Animal</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/volunteer">Volunteer</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/donate">Donate</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/auth/login">Login</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Header;
