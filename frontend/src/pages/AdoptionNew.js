import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { getAnimalById } from '../api/services/animalService';
import AdoptionForm from '../components/adoptions/AdoptionForm';
import PageTitle from '../components/common/PageTitle';

const AdoptionNew = () => {
    const navigate = useNavigate();
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchAnimal = async () => {
            try {
                const data = await getAnimalById(id);
                if (data.adoptionStatus !== 'Available') {
                    setError('This animal is not available for adoption.');
                    return;
                }
                setAnimal(data);
            } catch (err) {
                setError('Failed to load animal details.');
            } finally {
                setLoading(false);
            }
        };

        fetchAnimal();
    }, [id]);

    if (loading) {
        return (
            <Container className="py-4">
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-4">
                <Alert variant="danger" className="text-center">
                    {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="py-4">

            <PageTitle 
                title={`Adopt ${animal.name}`}
                previousPage={`/animals/${animal.id}`}
            />
            
            <Row className="g-4">

                {/* Adoption Form - left side */}
                <Col xs={12} lg={8}>
                    <Card className="h-100 border shadow">
                        <Card.Body>
                            <AdoptionForm animal={animal} onSuccess={() => navigate(-1)} onCancel={() => navigate(-1)} />
                        </Card.Body>
                    </Card>
                </Col>

                {/* Adoption Guide - right side */}
                <Col xs={12} lg={4}>
                    <Card className="h-100 border shadow">
                        <Card.Body>
                            <Card.Title className="mb-3">Adoption Guide</Card.Title>
                            <div className="guide-sections">
                                <div className="mb-3">
                                    <h6 className="mb-2">Personal Details</h6>
                                    <p className="small mb-0">Provide your full name, age, and accurate contact information so we can reach you.</p>
                                </div>

                                <div className="mb-3">
                                    <h6 className="mb-2">Home & Family</h6>
                                    <ul className="small mb-0 ps-3">
                                        <li>Type of residence (house, apartment, etc.)</li>
                                        <li>Number of people in household</li>
                                        <li>Presence of children</li>
                                    </ul>
                                </div>

                                <div className="mb-3">
                                    <h6 className="mb-2">Pet Experience</h6>
                                    <ul className="small mb-0 ps-3">
                                        <li>Current / previous pets</li>
                                        <li>Animal care experience</li>
                                        <li>Veterinary references</li>
                                    </ul>
                                </div>

                                <div>
                                    <h6 className="mb-2">Lifestyle & Care</h6>
                                    <ul className="small mb-0 ps-3">
                                        <li>Daily schedule and routine</li>
                                        <li>Exercise and activity plans</li>
                                        <li>Long-term commitment plans</li>
                                    </ul>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdoptionNew;
