import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

/* TODO: add more sections like: "new arrivals", "recent adoptions / donations" */

const Home = () => {
	const cardData = [
		{ title: "Adopt", description: "Find your companion and give them a new home", link: "/animals" },
		{ title: "Volunteer", description: "Make a difference in an animal's everyday life", link: "/volunteer" },
		{ title: "Donate", description: "Support our mission to care for animals in need", link: "/donations" },
	];

	return (
		<>
			{/* Hero section with background image and welcome message */}
			<section
				className="text-white mb-5 d-flex align-items-center justify-content-center"
				style={{
					background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/images/hero-background.jpg")',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					minHeight: '80vh'
				}}>
				<Container className="py-5 text-center">
					<Row className="justify-content-center">
						<Col lg={8}>
							<h1 className="display-4 fw-bold mb-4">Welcome to Our Animal Shelter</h1>
							<p className="lead mb-4">Providing home for all animals in need</p>
							<Button
								as={Link}
								to="/animals"
								variant="primary"
								size="lg"
								className="shadow mt-4">
								Meet Our Animals
							</Button>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Cards section with links */}
			<section className="py-5 bg-light">
				<Container>
					<Row className="g-4">
						{cardData.map((card, index) => (
							<Col md={4} key={index}>
								<Card className="h-100 shadow">
									<Card.Body className="text-center p-4">
										<Card.Title as="h4" className="mb-3">{card.title}</Card.Title>
										<Card.Text className="text-muted">{card.description}</Card.Text>
										<Button
											as={Link}
											to={card.link}
											variant="outline-primary">
											Learn More
										</Button>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			</section>
		</>
	);
};

export default Home;
