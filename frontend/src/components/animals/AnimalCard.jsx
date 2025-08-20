import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import AnimalImage from './AnimalImage';

const AnimalCard = ({ animal }) => {
    return (
        <Card className="mb-4 shadow border">
            <Row className="g-0">

                {/* Image section - left side */}
                <Col md={6}>
                    <AnimalImage src={animal.imageUrl} alt={animal.name} minHeight={300} />
                </Col>

                {/* Content section - right side */}
                <Col md={6}>
                    <Card.Body className="d-flex flex-column h-100">
                        <div className="flex-grow-1">
                            <Card.Title as="h2" className="mb-3">{animal.name}</Card.Title>
                            {animal.species && <p className="mb-1"><strong>Species:</strong> {animal.species}</p>}
                            {animal.breed && <p className="mb-1"><strong>Breed:</strong> {animal.breed}</p>}
                            {animal.gender && <p className="mb-1"><strong>Gender:</strong> {animal.gender}</p>}
                            {animal.description && <p className="mt-3 text-muted">{animal.description}</p>}
                        </div>
                        
                        {/* Buttons section - TODO: delete button and make whole card act as one*/}
                        <div className="d-flex">
                            <Button 
                                as={Link} 
                                to={`/animals/${animal.id}`} 
                                variant="outline-primary"
                                className="flex-grow-1"
                            >
                                View Details
                            </Button>
                        </div>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

export default AnimalCard;