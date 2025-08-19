import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { BACKEND_URL } from '../../api';

const AnimalCard = ({ animal }) => {
    return (
        <Card className="mb-4 shadow border">
            <Row className="g-0">

                {/* Image section - left side */}
                <Col md={6}>
                    {animal.imageUrl ? (
                        <Card.Img 
                            src={`${BACKEND_URL}${animal.imageUrl}`}
                            alt={animal.name}
                            className="img-fluid rounded-start h-100 object-fit-cover"
                            style={{ objectFit: 'cover', minHeight: '300px' }}
                        />
                    ) : (
                        <div 
                            className="bg-light d-flex align-items-center justify-content-center h-100 rounded-start"
                            style={{ minHeight: '300px' }}
                        >
                            <span className="text-muted">No image available</span>
                        </div>
                    )}
                </Col>

                {/* Content section - right side */}
                <Col md={6}>
                    <Card.Body className="d-flex flex-column h-100">
                        <div className="flex-grow-1">
                            <Card.Title as="h2" className="mb-3">{animal.name}</Card.Title>
                            <p className="mb-1"><strong>Age:</strong> {animal.age} years</p>
                            <p className="mb-1"><strong>Gender:</strong> {animal.gender}</p>
                            {animal.weight && <p className="mb-1"><strong>Weight:</strong> {animal.weight} kg</p>}
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