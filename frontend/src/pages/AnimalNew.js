import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { createAnimal } from "../api/services/animalService";

const AnimalNew = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // loading state for spinner
    const [error, setError] = useState(null); // error state for error messages
    
    const [animal, setAnimal] = useState({
        name: '',
        species: 'dog',
        age: '',
        weight: '',
        gender: 'male',
        description: '',
        adoptionStatus: 'available'
    });

    // handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setAnimal(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // handle form submission to create a new animal
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const animalData = {
                ...animal,
                age: animal.age ? parseInt(animal.age) : null,
                weight: animal.weight ? parseFloat(animal.weight) : null
            };
            await createAnimal(animalData);
            navigate('/animals');
        } catch (error) {
            console.error('Error creating animal:', error);
            setError(error.response?.data?.error || 'Failed to create animal');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-4 position-relative">
            <Row>
                <Col>
                    <h1 className="text-center mb-4">Add New Animal</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text"
                                placeholder="Enter animal name"
                                name="name"
                                value={animal.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Species</Form.Label>
                            <Form.Control 
                                as="select"
                                name="species"
                                value={animal.species}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select species</option>
                                <option value="dog">Dog</option>
                                <option value="cat">Cat</option>
                                <option value="other">Other</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Age</Form.Label>
                            <Form.Control 
                                type="number"
                                placeholder="Enter age in years"
                                name="age"
                                value={animal.age}
                                onChange={handleChange}
                                required
                                min="0"
                                max="100"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Weight</Form.Label>
                            <Form.Control 
                                type="number"
                                placeholder="Enter weight in kg"
                                name="weight"
                                value={animal.weight}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control 
                                as="select"
                                name="gender"
                                value={animal.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="unknown">Unknown</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea"
                                rows={3}
                                placeholder="Enter a brief description"
                                name="description"
                                value={animal.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Adoption Status</Form.Label>
                            <Form.Control 
                                as="select"
                                name="adoptionStatus"
                                value={animal.adoptionStatus}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select status</option>
                                <option value="available">Available</option>
                                <option value="unavailable">Unavailable</option>
                                <option value="adopted">Adopted</option>
                            </Form.Control>
                        </Form.Group>
                        {error && (
                            <Alert variant="danger" className="mt-3">
                                {error}
                            </Alert>
                        )}
                        
                        <div className="mt-4">
                            <Button 
                                variant="primary" 
                                type="submit" 
                                disabled={loading}
                                onClick={handleSubmit}
                            >
                                {loading ? 'Adding...' : 'Add Animal'}
                            </Button>
                            <Button 
                                variant="secondary" 
                                as={Link} 
                                to="/animals" 
                                className="ms-2"
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AnimalNew;