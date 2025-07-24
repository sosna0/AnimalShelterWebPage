import React from 'react';
import { Link } from 'react-router-dom';

/* TODO: add more sections like: "new arrivals", "recent adoptions / donations" */

const Home = () => {
	const cardData = [
		{ title: "Adopt", description: "Find your companion and give them a new home", link: "/animals" },
		{ title: "Volunteer", description: "Make a difference in an animal's everyday life", link: "/volunteer" },
		{ title: "Donate", description: "Support our mission to care for animals in need", link: "/donate" },
	];

	return (
		<div className="pt-5">	{/* Padding to avoid overlap with fixed header - maybe change later */}

			{/* Hero section with background image and welcome message */}
			<section className="hero text-center text-white mb-5"
					 style={{
						 background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/images/hero-background.jpg")',
						 backgroundSize: 'cover',
						 backgroundPosition: 'center',
						 minHeight: '80vh',
						 display: 'flex',
						 alignItems: 'center',
						 justifyContent: 'center'
					 }}>
				{/* Container for the welcome message */}
				<div className="container py-5">
					<div className="row justify-content-center">
						<div className="col-lg-8">
							<h1 className="display-4 fw-bold mb-4">Welcome to Our Animal Shelter</h1>
							<p className="lead mb-4">Providing home for all animals in need</p>
							<Link to="/animals" className="btn btn-primary btn-lg shadow mt-4">
								Meet Our Animals
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Cards section with links */}
			<section className="py-5 bg-light">
				<div className="container">
					<div className="row g-4">
						{cardData.map((card, index) => (
							<div className="col-md-4" key={index}>
								<div className="card h-100 border shadow">
									<div className="card-body text-center p-4">
										<h4 className="mb-3	">{card.title}</h4>
										<p className="text-muted">{card.description}</p>
										<Link to={card.link} className="btn btn-outline-primary">Learn More</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Home;
