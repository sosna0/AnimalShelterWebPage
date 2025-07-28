import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';

const AnimalCard = ({ animal }) => {
    return (
        <Card className="mb-4 shadow border">
            <Row className="g-0">

                {/* Image section - left side */}
                <Col md={4}>
                    {animal.imageUrl ? (
                        <div className="h-100">
                            <Card.Img 
                                src={animal.imageUrl}
                                alt={animal.name}
                                className="h-100 w-100"
                                style={{ objectFit: 'cover', minHeight: '300px' }}
                            />
                        </div>
                    ) : (
                        <div className="bg-light d-flex align-items-center justify-content-center h-100" style={{ minHeight: '300px' }}>
                            <span className="text-muted">No image available</span>
                        </div>
                    )}
                </Col>

                {/* Content section - right side */}
                <Col md={8}>
                    <Card.Body className="d-flex flex-column h-100">
                        <div className="flex-grow-1">
                            <Card.Title as="h2" className="mb-3">{animal.name}</Card.Title>
                            <Card.Text as="div">
                                <div className="animal-details">
                                    <p className="mb-1"><strong>Age:</strong> {animal.age} years</p>
                                    <p className="mb-1"><strong>Gender:</strong> {animal.gender}</p>
                                    {animal.weight && <p className="mb-1"><strong>Weight:</strong> {animal.weight} kg</p>}
                                    <p className="mt-3 text-muted">{animal.description}</p>
                                </div>
                            </Card.Text>
                        </div>
                        
                        {/* Buttons section */}
                        <div className="mt-auto pt-3 d-flex gap-2">
                            <Button 
                                as={Link} 
                                to={`/animals/${animal.id}`} 
                                variant="outline-primary"
                                className="flex-grow-1"
                            >
                                View Details
                            </Button>
                            {animal.adoptionStatus === 'available' && (
                                <Button 
                                    as={Link} 
                                    to={`/adopt/${animal.id}`} 
                                    variant="primary"
                                    className="flex-grow-1"
                                >
                                    Adopt Me
                                </Button>
                            )}
                        </div>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

export default AnimalCard;