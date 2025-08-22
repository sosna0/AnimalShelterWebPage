import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { format, subDays, subMonths, subYears } from 'date-fns';

const AdoptionSearchFilterBar = ({ onFilterChange, initialFilters }) => {
    const [filters, setFilters] = useState(initialFilters);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newFilters = {
            ...filters,
            [name]: value
        };

        // Calculate date range based on chosen timeRange
        if (name === 'timeRange') {
            const now = new Date();
            switch (value) {
                case 'week':
                    newFilters.startDate = format(subDays(now, 7), 'yyyy-MM-dd');
                    break;
                case 'month':
                    newFilters.startDate = format(subMonths(now, 1), 'yyyy-MM-dd');
                    break;
                case '6months':
                    newFilters.startDate = format(subMonths(now, 6), 'yyyy-MM-dd');
                    break;
                case 'year':
                    newFilters.startDate = format(subYears(now, 1), 'yyyy-MM-dd');
                    break;
                default:
                    newFilters.startDate = '';
            }
        }

        setFilters(newFilters);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange(filters);
    };

    const handleReset = () => {
        const emptyFilters = {
            animalName: '',
            status: '',
            timeRange: 'all',
            startDate: '',
        };
        setFilters(emptyFilters);
        onFilterChange(emptyFilters);
    };

    // update local filters when initialFilters changes
    useEffect(() => {
        if (initialFilters) {
            setFilters(initialFilters);
        }
    }, [initialFilters]);

    return (
        <Form onSubmit={handleSubmit} className="my-3 py-2 px-3 border rounded shadow-sm bg-light">
            <Row className="g-2 align-items-center">

                <Col lg={3}>
                    <Form.Control
                        type="text"
                        name="animalName"
                        value={filters.animalName}
                        onChange={handleInputChange}
                        placeholder="Search by animal"
                        size="sm"
                    />
                </Col>

                <Col lg={3}>
                    <Form.Select
                        name="status"
                        value={filters.status}
                        onChange={handleInputChange}
                        size="sm"
                    >
                        <option value="">Any Status</option>
                        <option value="Pending">Pending</option>
                        <option value="OnHold">On Hold</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </Form.Select>
                </Col>

                <Col lg={3}>
                    <Form.Select
                        name="timeRange"
                        value={filters.timeRange}
                        onChange={handleInputChange}
                        size="sm"
                    >
                        <option value="">Any Time</option>
                        <option value="week">Last Week</option>
                        <option value="month">Last Month</option>
                        <option value="6months">Last 6 Months</option>
                        <option value="year">Last Year</option>
                    </Form.Select>
                </Col>

                <Col lg={3} className="d-flex gap-1">
                    <Button 
                        type="button" 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={handleReset}
                        className="w-50"
                    >
                        Reset
                    </Button>
                    <Button 
                        type="submit" 
                        variant="primary" 
                        size="sm"
                        className="w-50"
                    >
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default AdoptionSearchFilterBar;
