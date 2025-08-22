
import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAdoptions } from '../api/services/adoptionService';
import { getAnimalById } from '../api/services/animalService';
import AdoptionCard from '../components/adoptions/AdoptionCard';
import AdoptionSearchFilterBar from '../components/adoptions/AdoptionSearchFilterBar';
import { RoleOnly } from '../components/access/RoleOnly';
import AdoptionStatusCounts from '../components/adoptions/AdoptionStatusCounts';

const StaffAdoptions = () => {
    const navigate = useNavigate();
    const [adoptions, setAdoptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilters, setActiveFilters] = useState({ animalName: '', status: '', timeRange: '', startDate: '' });

    // Fetch all adoptions and their animal details
    const fetchAdoptions = async () => {

        setLoading(true);
        setError(null);

        try {
            const allAdoptions = await getAdoptions();
            
            const adoptionsWithDetails = await Promise.all(
                allAdoptions.map(async (adoption) => {
                    let animalData = null;

                    try {
                        animalData = await getAnimalById(adoption.animalId);
                        console.log('Fetched animal data:', { adoptionId: adoption.id, animalId: adoption.animalId, animalData });
                    } catch (err) {
                        console.error('Error fetching animal details for adoption:', adoption.id, err);
                    }

                    return {
                        ...adoption,
                        animal: animalData || { name: 'Unknown Animal' }
                    };
                })
            );
            
            // Sort adoptions with Pending first, then OnHold, then others
            const sortedAdoptions = adoptionsWithDetails.sort((a, b) => {
                const statusOrder = {
                    'Pending': 0,
                    'OnHold': 1,
                    'Approved': 2,
                    'Rejected': 3
                };
                return statusOrder[a.status] - statusOrder[b.status] ||
                       new Date(b.createdAt) - new Date(a.createdAt);
            });

            setAdoptions(sortedAdoptions);

        } catch (err) {
            console.error('Error fetching adoptions:', err);
            setError(err.response?.data?.error || 'Failed to fetch adoptions.');
        } finally {
            setLoading(false);
        }
    };

    // useEffect to fetch adoption data on component mount
    useEffect(() => {
        fetchAdoptions();
    }, []);

    // Function to apply filters to the adoption list
    const applyFilters = (adoptionsList, filters) => {
        let filtered = [...adoptionsList];

        if (filters.status) {
            filtered = filtered.filter(adoption => 
                adoption.status === filters.status
            );
        }

        if (filters.animalName) {
            const searchTerm = filters.animalName.toLowerCase();
            filtered = filtered.filter(adoption => {
                if (!adoption.animal?.name) return false;
                return adoption.animal.name.toLowerCase().includes(searchTerm);
            });
        }

        if (filters.startDate) {
            const startDate = new Date(filters.startDate);
            filtered = filtered.filter(adoption => {
                try {
                    const adoptionDate = new Date(adoption.createdAt);
                    return adoptionDate >= startDate;
                } catch (err) {
                    return false;
                }
            });
        }

        return filtered;
    };

    // Function to handle filter changes
    const handleFilterChange = (newFilters) => {
        setActiveFilters(newFilters);
    };

    // Function to handle adoption details view
    const handleDetails = (adoptionId) => {
        navigate(`/adoptions/${adoptionId}`);
    };

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

    return (
        <RoleOnly allowedRoles={['staff']}>
            <Container className="my-4 container-fluid">
                <Row className="justify-content-center">
                    <Col xs={12} md={11} lg={9} xl={8}>
                        <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
    
                            <Card className="px-3 border shadow">
                                <Card.Body>

                                    {/* Title */}
                                    <h1 className="mb-4">Manage Adoptions</h1>

                                    {/* Status Counts */}
                                    <AdoptionStatusCounts adoptions={adoptions} />

                                    <Row className="justify-content-center">
                                        <Col>

                                            {/* Search Filter Bar */}
                                            <AdoptionSearchFilterBar
                                                onFilterChange={handleFilterChange}
                                                initialFilters={activeFilters}
                                            />

                                            {/* Error Message */}
                                            {error && (
                                                <Alert variant="danger" className="mb-4">
                                                    {error}
                                                </Alert>
                                            )}

                                            {/* Adoption Cards */}
                                            <div className="d-flex flex-column gap-3">
                                                {adoptions.length === 0 ? (
                                                    <Card className="border shadow-sm">
                                                        <Card.Body className="text-center py-5">
                                                            <p className="text-muted mb-0">
                                                                No adoption requests found
                                                            </p>
                                                        </Card.Body>
                                                    </Card>
                                                ) : (
                                                    applyFilters(adoptions, activeFilters).map(adoption => (
                                                        <AdoptionCard
                                                            key={adoption.id}
                                                            adoption={adoption}
                                                            animal={adoption.animal}
                                                            onDetails={handleDetails}
                                                            isStaffView={true}
                                                        />
                                                    ))
                                                )}
                                            </div>

                                        </Col>
                                    </Row>

                                </Card.Body>
                            </Card>

                        </div>
                    </Col>
                </Row>
            </Container>
        </RoleOnly>
    );
};

export default StaffAdoptions;