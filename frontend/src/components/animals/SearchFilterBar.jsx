import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';

const SearchFilterBar = ({ onFilterChange, initialFilters }) => {
    const [filters, setFilters] = useState(initialFilters); // local filters state

    // handle input change to update filters
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // handle form submission to apply filters
    const handleSubmit = (e) => {
        e.preventDefault();
        const activeFilters = Object.entries(filters).reduce((acc, [key, value]) => {
            if (value !== '') {
                acc[key] = value;
            }
            return acc;
        }, {});
        onFilterChange(activeFilters);
    };

    // handle reset button to clear filters
    const handleReset = () => {
        const emptyFilters = {
            name: '',
            species: '',
            ageMin: '',
            ageMax: '',
            gender: '',
            adoptionStatus: ''
        };
        setFilters(emptyFilters);
        onFilterChange(emptyFilters);
    };

    // update local filters when initialFilters changes
    useEffect(() => {
        setFilters(initialFilters);
    }, [initialFilters]);

    return (
        <Form onSubmit={handleSubmit} className="my-4 py-2 px-3 border rounded shadow-sm bg-light">
            <Row className="g-2 align-items-center">
                <Col lg={2}>
                    <Form.Control
                        type="text"
                        name="name"
                        value={filters.name}
                        onChange={handleInputChange}
                        placeholder="Search by name"
                        size="sm"
                    />
                </Col>
                <Col lg={2}>
                    <Form.Select
                        name="species"
                        value={filters.species}
                        onChange={handleInputChange}
                        size="sm"
                    >
                        <option value="">All Species</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="other">Other</option>
                    </Form.Select>
                </Col>
                <Col lg={2}>
                    <InputGroup size="sm">
                        <Form.Control
                            type="number"
                            name="ageMin"
                            value={filters.ageMin}
                            onChange={handleInputChange}
                            placeholder="Min age"
                            min="0"
                            max="100"
                        />
                        <Form.Control
                            type="number"
                            name="ageMax"
                            value={filters.ageMax}
                            onChange={handleInputChange}
                            placeholder="Max age"
                            min="0"
                            max="100"
                        />
                    </InputGroup>
                </Col>
                <Col lg={2}>
                    <Form.Select
                        name="gender"
                        value={filters.gender}
                        onChange={handleInputChange}
                        size="sm"
                    >
                        <option value="">Any Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="unknown">Unknown</option>
                    </Form.Select>
                </Col>
                <Col lg={2}>
                    <Form.Select
                        name="adoptionStatus"
                        value={filters.adoptionStatus}
                        onChange={handleInputChange}
                        size="sm"
                    >
                        <option value="">Any Status</option>
                        <option value="available">Available</option>
                        <option value="pending">Pending</option>
                        <option value="adopted">Adopted</option>
                    </Form.Select>
                </Col>
                <Col lg={2} className="d-flex gap-2">
                    <Button 
                        variant="outline-secondary" 
                        type="button" 
                        onClick={handleReset}
                        size="sm"
                        className="flex-grow-1"
                    >
                        Reset
                    </Button>
                    <Button 
                        variant="primary" 
                        type="submit"
                        size="sm"
                        className="flex-grow-1"
                    >
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default SearchFilterBar;
