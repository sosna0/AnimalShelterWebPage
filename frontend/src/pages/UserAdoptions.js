import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../hooks/use-auth';
import { getUserAdoptions, deleteAdoption } from '../api/services/adoptionService';
import { getAnimalById } from '../api/services/animalService';
import AdoptionCard from '../components/adoptions/AdoptionCard';
import ConfirmationModal from '../components/common/ConfirmationModal';

const UserAdoptions = () => {
    const navigate = useNavigate();
    const [adoptions, setAdoptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAdoptionId, setSelectedAdoptionId] = useState(null);
    const { user } = useAuth();

    // Fetch user adoptions and their animal details
    const fetchAdoptions = async () => {

        setLoading(true);
        setError(null);

        try {
            const userAdoptions = await getUserAdoptions(user.id);
            
            const adoptionsWithAnimals = await Promise.all(
                userAdoptions.map(async (adoption) => {
                    const animalData = await getAnimalById(adoption.animalId);
                    return {
                        ...adoption,
                        animal: animalData
                    };
                })
            );
            
            setAdoptions(adoptionsWithAnimals);

        } catch (err) {
            console.error('Error fetching adoptions:', err);
            setError(err.response?.data?.error || 'Failed to fetch adoptions.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch adoptions when user ID changes
    useEffect(() => {
        if (user?.id) {
            fetchAdoptions();
        }
    }, [user?.id]);

    // Handle navigation to details page
    const handleDetails = (adoptionId) => {
        navigate(`/adoptions/${adoptionId}`);
    };

    // Handle delete action
    const handleDelete = async (adoptionId) => {
        setSelectedAdoptionId(adoptionId);
        setShowDeleteModal(true);
    };

    // Confirm delete action
    const confirmDelete = async () => {
        try {
            await deleteAdoption(selectedAdoptionId);

            setAdoptions(prev => prev.filter(a => a.id !== selectedAdoptionId));
            setShowDeleteModal(false);

        } catch (err) {
            console.error('Error deleting adoption:', err);
            setError('Failed to delete adoption request.');
        }
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
        <Container className="my-4 container-fluid">
            <Row className="justify-content-center">
                <Col xs={12} md={11} lg={9} xl={8}>
                    <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>

                        <Card className="px-3 border shadow">
                            <Card.Body>

                                {/* Title */}
                                <h1 className="text-center mb-4">Your Adoption Requests</h1>

                                {/* Error Message */}
                                {error && (
                                    <Alert variant="danger" className="mb-4">
                                        {error}
                                    </Alert>
                                )}

                                {/* Content */}
                                {adoptions.length === 0 ? (
                                    <div className="text-center py-5">
                                        <p className="text-muted mb-0">
                                            No adoption requests found
                                        </p>
                                    </div>
                                ) : (
                                    adoptions.map(adoption => (
                                        <div key={adoption.id} className="mb-3">
                                            <AdoptionCard
                                                key={adoption.id}
                                                adoption={adoption}
                                                animal={adoption.animal}
                                                user={adoption.user}
                                                onDetails={handleDetails}
                                                onDelete={handleDelete}
                                            />
                                        </div>
                                    ))
                                )}

                                {/* Confirmation Modal */}
                                <ConfirmationModal
                                    show={showDeleteModal}
                                    onHide={() => setShowDeleteModal(false)}
                                    onConfirm={confirmDelete}
                                    title="Cancel Adoption Request"
                                    message="Are you sure you want to cancel this adoption request? This action cannot be undone."
                                    confirmLabel="Proceed"
                                    confirmVariant="danger"
                                />

                            </Card.Body>
                        </Card>
                    </div>  
                </Col>
            </Row>
        </Container>
        );
};

export default UserAdoptions;