import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { getAnimals, getAnimalsByFilters } from "../api/services/animalService";
import { RoleOnly } from "../components/access/RoleOnly";
import AnimalCard from "../components/animals/AnimalCard";
import SearchFilterBar from "../components/animals/SearchFilterBar";
import FloatingButton from "../components/common/FloatingButton";

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
            {animals.length > 0 ? (
                <Row xs={1} lg={2}>
                    {animals.map((animal) => (
                        <Col key={animal.id}>
                            <AnimalCard animal={animal} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <div className="mt-4 d-flex justify-content-center">
                    <Alert variant="info" className="text-center">
                        No animals found matching your criteria.
                    </Alert>
                </div>
            )}
            
            <RoleOnly allowedRoles={['staff']}>
                <FloatingButton 
                    to="/animals/new" 
                    title="Add new animal"
                    bottom="2rem"
                    right="2rem"
                    >
                        +
                    </FloatingButton>
            </RoleOnly>
        </Container>
    );
}

export default Animals;