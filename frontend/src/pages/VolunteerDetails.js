import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { format } from 'date-fns';
import { getVolunteerById, updateVolunteer } from '../api/services/volunteerService';
import { getAnimalById } from '../api/services/animalService';
import { getUserById } from '../api/services/userService';
import { useAuth } from '../hooks/use-auth';
import PageTitle from '../components/common/PageTitle';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { RoleOnly } from '../components/access/RoleOnly';


const VolunteerDetails = () => {
    const { id } = useParams(); // adoption ID from the URL
    const { user } = useAuth(); // current user
    const [volunteer, setVolunteer] = useState(null);
    const [animal, setAnimal] = useState(null);
    const [volunteerUser, setVolunteerUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);

    // Fetch volunteer, user and animal data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const volunteerData = await getVolunteerById(id);
                setVolunteer(volunteerData);
    
                const [animalData, userData] = await Promise.all([
                    getAnimalById(volunteerData.animalId),
                    getUserById(volunteerData.userId)
                ]);
    
                setAnimal(animalData);
                setVolunteerUser(userData);
    
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to load volunteer details');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);
    

    // Get the status badge variant
    const getStatusVariant = (status) => {
        switch (status) {
            case 'Submitted':
                return 'success';
            case 'Canceled':
                return 'danger';
            default:
                return 'secondary';
        }
    };

    // Confirm cancel action
    const confirmCancel = async () => {
        try {
            await updateVolunteer(id, { status: "Canceled" });
    
            setVolunteer(prev => ({
                ...prev,
                status: "Canceled"
            }));
            
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

    if (error) {
        return (
            <Container className="py-4">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            {/* Page Title */}
            <PageTitle
                title="Volunteer Details"
                previousPage={user?.role === 'staff' ? "/staff-volunteers" : "/user-volunteers"}
            />

            {/* Content */}
            <Card className="mb-4">
                <Card.Body>
                    {/* Volunteer Details */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h3 className="mb-1">Volunteer for {animal?.name} ({volunteer.activityType})</h3>
                            <div className="d-flex align-items-center gap-3">
                                <Badge bg={getStatusVariant(volunteer.status)}>
                                    {volunteer.status}
                                </Badge>
                                <span className="text-muted">
                                    Submitted on {format(new Date(volunteer.createdAt), 'PPpp')}
                                </span>
                            </div>
                        </div>

                        <RoleOnly allowedRoles={['public']}>
                            {volunteer?.status === 'Submitted' && (
                                <Button
                                    variant="outline-danger"
                                    onClick={() => setShowCancelModal(true)}
                                >
                                    Cancel Activity
                                </Button>
                            )}
                        </RoleOnly>

                    </div>

                    {/* Request Details */}
                    <h4>Volunteer Details</h4>
                    <Card className="bg-light mb-4">
                        <Card.Body>
                            <p><strong>Activity:</strong> {volunteer.activityType}</p>
                            <p><strong>Date:</strong> {format(new Date(volunteer.date), 'PPpp')}</p>
                            <p><strong>Animal:</strong> {animal.name}</p>
                            <RoleOnly allowedRoles={['staff']}>
                                <p><strong>Username:</strong> {volunteerUser.username}</p>
                                <p><strong>Email:</strong> {volunteerUser.email}</p>
                            </RoleOnly>
                        </Card.Body>
                    </Card>
                    
                </Card.Body>
            </Card>

            {/* Confirmation Modal for Canceling Volunteer */}
            <ConfirmationModal
                show={showCancelModal}
                onHide={() => setShowCancelModal(false)}
                onConfirm={confirmCancel}
                title="Cancel Volunteer Activity"
                message="Are you sure you want to cancel this volunteer activity? This action cannot be undone."
                confirmLabel="Proceed"
                confirmVariant="danger"
            />

        </Container>
    );
};

export default VolunteerDetails;