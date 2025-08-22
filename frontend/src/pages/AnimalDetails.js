import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert, Button } from 'react-bootstrap';
import { format } from 'date-fns';
import { getAnimalById, deleteAnimal } from '../api/services/animalService';
import { getUserAdoptions } from '../api/services/adoptionService';
import ConfirmationModal from '../components/common/ConfirmationModal';
import PageTitle from '../components/common/PageTitle';
import { RoleOnly } from '../components/access/RoleOnly';
import { useAuth } from '../hooks/use-auth';
import AnimalImage from '../components/animals/AnimalImage';

const AnimalDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // animal ID from the URL
    const { user } = useAuth(); // current user from auth context to disable adopt button

    const [animal, setAnimal] = useState([]); // state to hold animal details
    const [loading, setLoading] = useState(true); // loading state for spinner
    const [error, setError] = useState(null); // error state for error messages
    const [showDeleteModal, setShowDeleteModal] = useState(false); // state to control delete confirmation
    const [hasPendingRequest, setHasPendingRequest] = useState(false);

    // useEffect to fetch animal details on component mount
    useEffect(() => {

        // function to fetch animal details by ID
        const fetchAnimal = async () => {

            setLoading(true);
            setError(null);

            try {
                let animal = await getAnimalById(id);

                setAnimal(animal);

            } catch (err) {
                setError(err.message || 'Failed to load animal details');
                console.error('Error fetching animal details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimal();
    }, [id]);

    // check if the current user already has a pending adoption for this animal
    useEffect(() => {
        const checkPending = async () => {

            if (!user) {
                setHasPendingRequest(false);
                return;
            }

            try {
                const adoptions = await getUserAdoptions(user.id);
                const hasPending = adoptions.some(a => a.animalId === parseInt(id, 10) && a.status === 'Pending');
                
                setHasPendingRequest(hasPending);

            } catch (err) {
                setHasPendingRequest(false);
                console.error('Failed to check user adoptions:', err);
            }
        };

        checkPending();
        
    }, [user, id]);

    // function to handle animal deletion button click
    const handleDelete = async () => {
        try {
            await deleteAnimal(id);
            navigate('/animals');
        } catch (err) {
            setError(err.message || 'Failed to delete animal');
            console.error('Error deleting animal:', err);
        } finally {
            setShowDeleteModal(false);
        }
    };

    // function to handle adoption button click
    const handleAdopt = () => {
        navigate(`/adoptions/new/${id}`);
    };

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

    // render error message if animal not found
    if (!animal) return (
        <Container className="text-center mt-5">
            <Alert variant="warning">Animal not found</Alert>
        </Container>
    );

    return (
        <Container className="py-4">
            
            <PageTitle 
                title="Animal Details"
                previousPage="/animals"
            />

            <Card className='mb-4 shadow border'>
                <Row className="g-0">

                    {/* Image section - left side */}
                    <Col md={4}>
                        <AnimalImage src={animal.imageUrl} alt={animal.name} minHeight={300} />
                    </Col>

                    {/* Content section - right side */}
                    <Col md={8}>
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-start">
                                <Card.Title as="h2" className="mb-3">{animal.name}</Card.Title>
                                <p className="text-muted">
                                    ID: {animal.id}
                                </p>
                            </div>
                            <Row className="mb-3">
                                <Col sm={4}>
                                    <p><strong>Species:</strong> {animal.species}</p>
                                    <p><strong>Breed:</strong> {animal.breed || 'Not specified'}</p>
                                    <p><strong>Gender:</strong> {animal.gender}</p>
                                    <p><strong>Age:</strong> {animal.age == null ? 'Not specified' : `${animal.age} year${animal.age === 1 ? '' : 's'}`}</p>
                                    <p><strong>Weight:</strong> {animal.weight ? `${animal.weight} kg` : 'Not specified'}</p>
                                    <p><strong>Status:</strong> {animal.adoptionStatus}</p>
                                    <p><strong>In Shelter Since:</strong> {
                                        animal.createdAt ? 
                                        format(new Date(animal.createdAt), 'dd-MM-yyyy') :
                                        'Not available'
                                    }</p>
                                </Col>
                                <Col sm={8}>
                                    <strong>Long Description:</strong><br />
                                    {animal.longDescription || 'No long description available'}
                                </Col>
                            </Row>

                            {/* Buttons section */}
                            <div className="d-flex align-items-center gap-3">
                                <RoleOnly allowedRoles={['guest', 'public']}>
                                    <div>
                                        <Button 
                                            variant="primary" 
                                            onClick={handleAdopt}
                                            disabled={animal.adoptionStatus !== 'Available' || !user || hasPendingRequest}
                                        >
                                            Adopt
                                        </Button>
                                    </div>
                                </RoleOnly>

                                {hasPendingRequest && (
                                    <span className='text-info'>You have a pending adoption request for this animal.</span>
                                )}

                                <RoleOnly allowedRoles={['guest']}>
                                    <span className='text-danger'>You must be logged in to adopt an animal.</span>
                                </RoleOnly>

                                <RoleOnly allowedRoles={['staff']}>
                                    <Button 
                                        variant="warning" 
                                        onClick={() => navigate(`/animals/edit/${id}`)}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="danger" 
                                        onClick={() => setShowDeleteModal(true)}
                                    >
                                        Delete
                                    </Button>
                                </RoleOnly>

                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>

            <ConfirmationModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="Delete Animal"
                message={`Are you sure you want to delete ${animal.name}? This action cannot be undone.`}
                confirmLabel="Delete"
            />
        </Container>
    );
};

export default AnimalDetails;
