import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { getAnimals } from "../api/services/animalService";
import AnimalCard from "../components/animals/AnimalCard";

const Animals = () => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const data = await getAnimals();
                setAnimals(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch animals. Please try again later.');
                setLoading(false);
            }
        };

        fetchAnimals();
    }, []);

    if (loading) return (
        <Container className="text-center mt-5">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    );

    if (error) return (
        <Container className="mt-4">
            <Alert variant="danger">{error}</Alert>
        </Container>
    );

    return (
        <Container className="py-5">
            <h1 className="text-center mb-4">Our Animals</h1>
            <Row xs={1} md={2} className="g-4">
                {animals.map((animal) => (
                    <Col key={animal.id}>
                        <AnimalCard animal={animal} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Animals;