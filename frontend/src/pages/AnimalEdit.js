import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { getAnimalById } from '../api/services/animalService';
import { RoleOnly } from '../components/access/RoleOnly';
import AnimalForm from '../components/animals/AnimalForm';
import GoBackButton from '../components/common/GoBackButton';

const AnimalEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [animal, setAnimal] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnimal = async () => {
            try {
                const data = await getAnimalById(id);
                setAnimal(data);
            } catch (err) {
                setError(err.message || 'Failed to load animal details');
            } finally {
                setLoading(false);
            }
        };

        fetchAnimal();
    }, [id]);

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="text-center mt-5 text-danger">{error}</div>;
    if (!animal) return <div className="text-center mt-5">Animal not found</div>;

    return (
        <RoleOnly allowedRoles={['staff']}>
            <Container className="py-4">
                <Row className='mb-4'>
                    <Col md={1} className="d-flex align-items-center">
                        <GoBackButton 
                            className="me-3"
                            previousPage={`/animals/${id}`}
                        />
                    </Col>
                    <Col md={10}>
                        <h1 className="text-center m-0">
                            Edit Animal
                        </h1>
                    </Col>
                    <Col md={1} className="d-flex align-items-center"></Col>          
                </Row>
                <AnimalForm
                    initialData={animal}
                    submitLabel="Save Changes"
                    onSuccess={() => navigate(`/animals/${id}`)}
                />
            </Container>
        </RoleOnly>
    );
};

export default AnimalEdit;
