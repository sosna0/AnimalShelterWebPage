import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { getAnimals, getAnimalsByFilters } from "../api/services/animalService";
import { RoleOnly } from "../components/access/RoleOnly";
import AnimalCard from "../components/animals/AnimalCard";
import SearchFilterBar from "../components/animals/SearchFilterBar";

const Animals = () => {
    const [animals, setAnimals] = useState([]); // loaded animals state
    const [loading, setLoading] = useState(true); // loading state for spinner
    const [error, setError] = useState(null); // error state for error messages
    const [activeFilters, setActiveFilters] = useState({ name: '', species: '', ageMin: '', ageMax: '', gender: '', adoptionStatus: ''}); // filters state

    // function to fetch animals based on filters
    const fetchAnimals = async (filters = {}) => {

        setLoading(true);
        setError(null);
        setActiveFilters(filters);

        try {
            let animals;
            
            if (Object.keys(filters).length === 0) {
                animals = await getAnimals();
            }
            else {
                const nonEmptyFilters = Object.fromEntries(
                    Object.entries(filters).filter(([_, value]) => value !== '')
                );
                animals = await getAnimalsByFilters(nonEmptyFilters);
            }

            setAnimals(animals);

        } catch (err) {
            setError('Failed to fetch animals. Please try again later.');
            console.error('Error fetching animals:', err);
        } finally {
            setLoading(false);
        }
    };

    // useEffect to fetch animals on component mount
    useEffect(() => {
        fetchAnimals();
    }, []);

    // render loading spinner if data is being fetched
    if (loading) return (
        <Container className="text-center mt-5">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    );

    // render error message if there is an error
    if (error) return (
        <Container className="mt-4">
            <Alert variant="danger">{error}</Alert>
        </Container>
    );

    return (
        <Container className="py-4">
            <h1 className="text-center mb-4">Our Animals</h1>
            <SearchFilterBar 
                onFilterChange={fetchAnimals}
                initialFilters={activeFilters}
            />
            <Row xs={1} md={2} className="g-4">
                {animals.length > 0 ? (
                    animals.map((animal) => (
                        <Col key={animal.id}>
                            <AnimalCard animal={animal} />
                        </Col>
                    ))
                ) : (
                    <Col xs={12}>
                        <Alert variant="info" className="text-center">
                            No animals found matching your criteria.
                        </Alert>
                    </Col>
                )}
            </Row>
            
            <RoleOnly allowedRoles={['staff']}>
                <Button
                    as={Link}
                    to="/animals/new"
                    variant="primary"
                    className="position-fixed"
                    style={{
                        bottom: '2rem',
                        right: '2rem',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        fontSize: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        zIndex: 1000
                    }}>
                    +
                </Button>
            </RoleOnly>
        </Container>
    );
}

export default Animals;