import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { format } from 'date-fns';
import { getAdoptionById, deleteAdoption, updateAdoptionStatus } from '../api/services/adoptionService';
import { getAnimalById, updateAnimal } from '../api/services/animalService';
import { useAuth } from '../hooks/use-auth';
import PageTitle from '../components/common/PageTitle';
import ConfirmationModal from '../components/common/ConfirmationModal';
import StatusChangeModal from '../components/adoptions/StatusChangeModal';
import { RoleOnly } from '../components/access/RoleOnly';

const AdoptionDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // adoption ID from the URL
    const { user } = useAuth(); // current user

    const [adoption, setAdoption] = useState(null);
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [response, setResponse] = useState('');

    // Fetch adoption and animal data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const adoptionData = await getAdoptionById(id);
                setAdoption(adoptionData);

                const animalData = await getAnimalById(adoptionData.animalId);
                setAnimal(animalData);
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to load adoption details');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Get the status badge variant
    const getStatusVariant = (status) => {
        switch (status) {
            case 'Pending':
                return 'warning';
            case 'OnHold':
                return 'info';
            case 'Approved':
                return 'success';
            case 'Rejected':
                return 'danger';
            default:
                return 'secondary';
        }
    };

    // Handle adoption request deletion
    const handleDelete = async () => {
        try {
            await deleteAdoption(id);
            navigate('/user-adoptions', {
                state: { message: 'Adoption request cancelled successfully' }
            });
        } catch (err) {
            setError('Failed to cancel adoption request.');
        }
        setShowDeleteModal(false);
    };

    // Handle adoption status changes
    const handleStatusChange = async () => {
        try {
            await updateAdoptionStatus(id, selectedStatus, response);

            // Update animal status if adoption status changes
            if (selectedStatus === 'Approved' || selectedStatus === 'Rejected') {
                const animalStatus = selectedStatus === 'Approved' ? 'Adopted' : 'Available';
                await updateAnimal(adoption.animalId, { ...animal, adoptionStatus: animalStatus });
            } else if (selectedStatus === 'Pending') {
                await updateAnimal(adoption.animalId, { ...animal, adoptionStatus: 'Pending' });
            }

            // Refresh adoption and animal data
            const [updatedAdoption, updatedAnimal] = await Promise.all([
                getAdoptionById(id),
                getAnimalById(adoption.animalId)
            ]);

            setAdoption(updatedAdoption);
            setAnimal(updatedAnimal);
            setShowStatusModal(false);
            setResponse('');
        } catch (err) {
            setError('Failed to update adoption status.');
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
                title="Adoption Request Details"
                previousPage={user?.role === 'staff' ? "/staff-adoptions" : "/user-adoptions"}
            />

            {/* Content */}
            <Card className="mb-4">
                <Card.Body>
                    {/* Adoption Details */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h4 className="mb-1">Adoption Request for {animal?.name}</h4>
                            <div className="d-flex align-items-center gap-3">
                                <Badge bg={getStatusVariant(adoption.status)}>
                                    {adoption.status}
                                </Badge>
                                <span className="text-muted">
                                    Submitted on {format(new Date(adoption.createdAt), 'PPpp')}
                                </span>
                            </div>
                        </div>
                        <RoleOnly allowedRoles={['public']}>
                            {adoption.status === 'Pending' && (
                                <Button
                                    variant="outline-primary"
                                    onClick={() => setShowStatusModal(true)}
                                >
                                    Cancel Request
                                </Button>
                            )}
                        </RoleOnly>
                    </div>

                    {/* Request Details */}
                    <h5>Request Details</h5>
                    <Card className="bg-light mb-4">
                        <Card.Body>
                            <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                                {adoption.survey}
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Staff Response */}
                    {adoption.response && (
                        <>
                            <h5 className="mt-4">Staff Response</h5>
                            <Card className={`border-${getStatusVariant(adoption.status)}`}>
                                <Card.Body>
                                    <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                                        {adoption.response}
                                    </div>
                                    <div className="text-muted small mt-2">
                                        Updated on {format(new Date(adoption.updatedAt), 'PPpp')}
                                    </div>
                                </Card.Body>
                            </Card>
                        </>
                    )}

                    {/* Status Actions for Staff */}
                    <RoleOnly allowedRoles={['staff']}>
                        {(adoption.status === 'Pending' || adoption.status === 'OnHold') && (
                            <div className="mt-4 d-flex gap-2 justify-content-end">
                                {adoption.status !== 'OnHold' && (
                                    <Button
                                        variant="outline-info"
                                        onClick={() => {
                                            setSelectedStatus('OnHold');
                                            setShowStatusModal(true);
                                        }}
                                    >
                                        Put Request On Hold
                                    </Button>
                                )}
                                <Button
                                    variant="outline-success"
                                    onClick={() => {
                                        setSelectedStatus('Approved');
                                        setShowStatusModal(true);
                                    }}
                                >
                                    Approve Adoption
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => {
                                        setSelectedStatus('Rejected');
                                        setShowStatusModal(true);
                                    }}
                                >
                                    Reject Request
                                </Button>
                            </div>
                        )}
                    </RoleOnly>
                </Card.Body>
            </Card>

            {/* Confirmation Modal for Deleting Adoption */}
            <ConfirmationModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="Cancel Adoption Request"
                message="Are you sure you want to cancel this adoption request? This action cannot be undone."
                confirmLabel="Proceed"
            />

            {/* Status Change Modal for Staff */}
            <StatusChangeModal
                show={showStatusModal}
                onHide={() => {
                    setShowStatusModal(false);
                    setResponse('');
                }}
                onSubmit={handleStatusChange}
                status={selectedStatus}
                response={response}
                onResponseChange={setResponse}
            />
        </Container>
    );
};

export default AdoptionDetails;
