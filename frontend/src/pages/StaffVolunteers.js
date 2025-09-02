import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../hooks/use-auth';
import { getVolunteers, updateVolunteer } from "../api/services/volunteerService";
import { getAnimalById } from '../api/services/animalService';
import VolunteerCard from "../components/volunteers/VolunteerCard";
import ConfirmationModal from '../components/common/ConfirmationModal';


const StaffVolunteers = () => {
    const navigate = useNavigate();
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedVolunteerId, setSelectedVolunteerId] = useState(null);
    const { user } = useAuth();

    // Fetch user volunteers and their animal details
    const fetchVolunteers = async () => {

        setLoading(true);
        setError(null);

        try {
            const userVolunteers = await getVolunteers();
            
            const volunteersWithAnimals = await Promise.all(
                userVolunteers.map(async (volunteer) => {
                    const animalData = await getAnimalById(volunteer.animalId);
                    return {
                        ...volunteer,
                        animal: animalData
                    };
                })
            );
            
            setVolunteers(volunteersWithAnimals);

        } catch (err) {
            console.error('Error fetching volunteers:', err);
            setError(err.response?.data?.error || 'Failed to fetch volunteers.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch volunteers when user ID changes
    useEffect(() => {
        if (user?.id) {
            fetchVolunteers();
        }
    }, [user?.id]);

    // Handle navigation to details page
    const handleDetails = (volunteerId) => {
        navigate(`/volunteers/${volunteerId}`);
    };

    // Handle cancel volunteer action
    const handleCancel = async (volunteerId) => {
        setSelectedVolunteerId(volunteerId);
        setShowCancelModal(true);
    };

    // Confirm delete action
    const confirmCancel = async () => {
        try {
            await updateVolunteer(selectedVolunteerId, { status: "Canceled" });
    
            setVolunteers(prev =>
                prev.map(v =>
                    v.id === selectedVolunteerId ? { ...v, status: "Canceled" } : v
                )
            );
            setShowCancelModal(false);

        } catch (err) {
            console.error('Error changing volunteer status:', err);
            setError('Failed to change volunteer status.');
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
                                <h1 className="text-center mb-4">All Volunteer Activities</h1>

                                {/* Error Message */}
                                {error && (
                                    <Alert variant="danger" className="mb-4">
                                        {error}
                                    </Alert>
                                )}

                                {/* Content */}
                                {volunteers.length === 0 ? (
                                    <div className="text-center py-5">
                                        <p className="text-muted mb-0">
                                            No volunteers found
                                        </p>
                                    </div>
                                ) : (
                                    volunteers.map(volunteer => (
                                        <div key={volunteer.id} className="mb-3">
                                            <VolunteerCard
                                                key={volunteer.id}
                                                volunteer={volunteer}
                                                animal={volunteer.animal}
                                                user={volunteer.user}
                                                onDetails={handleDetails}
                                                onCancel={handleCancel}
                                            />
                                        </div>
                                    ))
                                )}

                                {/* Confirmation Modal */}
                                <ConfirmationModal
                                    show={showCancelModal}
                                    onHide={() => setShowCancelModal(false)}
                                    onConfirm={confirmCancel}
                                    title="Cancel Volunteer Activity"
                                    message="Are you sure you want to cancel this volunteer activity? This action cannot be undone."
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

export default StaffVolunteers;