import React, { useState } from "react";
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { createAnimal, updateAnimal } from "../../api/services/animalService";

const AnimalForm = ({
    initialData = { name: '', species: '', breed: '', age: '', weight: '', gender: '', description: '', longDescription: '', adoptionStatus: '' },
    submitLabel = "Submit",
    onSuccess = null
}) => {
    const navigate = useNavigate();
    const [animal, setAnimal] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const formErrors = {};

        // name validation
        if (!animal.name?.trim()) {
            formErrors.name = "Name is required";
        }

        // species validation
        if (!animal.species) {
            formErrors.species = "Species is required";
        }

        // age validation
        const age = parseFloat(animal.age);
        if (!isNaN(age) && (age < 0 || age > 1000)) {
            formErrors.age = "Age must be a number between 0 and 1000";
        }

        // weight validation (required and positive)
        const weight = parseFloat(animal.weight);
        if (!isNaN(weight) && (weight <= 0 || weight > 1000)) {
            formErrors.weight = "Weight must be a number between 0 and 1000";
        }

        // gender validation
        if (!animal.gender) {
            formErrors.gender = "Gender is required";
        }

        // adoption status validation
        if (!animal.adoptionStatus) {
            formErrors.adoptionStatus = "Adoption status is required";
        }

        return formErrors;
    };

    const sanitizeForm = () => {
        const formAnimal = {
            ...animal,
            name: animal.name != null ? animal.name.trim() : '',
            breed: animal.breed != null ? animal.breed.trim() : '',
            age: parseInt(animal.age),
            weight: parseFloat(animal.weight),
            description: animal.description != null ? animal.description.trim() : '',
            longDescription: animal.longDescription != null ? animal.longDescription.trim() : '',
        };
        
        return formAnimal;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setAnimal(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setLoading(true);

        try {
            const sanitizedAnimal = sanitizeForm();

            if (initialData.id) {
                await updateAnimal(initialData.id, sanitizedAnimal);
            } else {
                await createAnimal(sanitizedAnimal);
            }
            
            if (onSuccess) {
                onSuccess();
            } else {
                navigate('/animals');
            }
        } catch (err) {
            setErrors({ submit: err.response?.data?.message || err.message || 'Failed to save animal' });
            console.error('Error saving animal:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit} noValidate>

            {/* Basic Information - 2 column layout */}
            <div className="row g-3 mb-3">
                <div className="col-md-6">
                    {/* Name */}
                    <Form.Group>
                        <Form.Label>Name *</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter animal name"
                            name="name"
                            value={animal.name}
                            onChange={handleChange}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>

                <div className="col-md-6">
                    {/* Species */}
                    <Form.Group>
                        <Form.Label>Species *</Form.Label>
                        <Form.Select
                            name="species"
                            value={animal.species}
                            onChange={handleChange}
                            isInvalid={!!errors.species}
                        >
                            <option value="" hidden>Select species</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Other">Other</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.species}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>

                <div className="col-md-6">
                    {/* Breed */}
                    <Form.Group>
                        <Form.Label>Breed</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter breed"
                            name="breed"
                            value={animal.breed}
                            onChange={handleChange}
                            isInvalid={!!errors.breed}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.breed}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>

                <div className="col-md-6">
                    {/* Gender */}
                    <Form.Group>
                        <Form.Label>Gender *</Form.Label>
                        <Form.Select
                            name="gender"
                            value={animal.gender}
                            onChange={handleChange}
                            isInvalid={!!errors.gender}
                        >
                            <option value="" hidden>Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Unknown">Unknown</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.gender}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>

                <div className="col-md-6">
                    {/* Age */}
                    <Form.Group>
                        <Form.Label>Age (years)</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter age"
                            name="age"
                            value={animal.age}
                            onChange={handleChange}
                            min="0"
                            max="1000"
                            step="1"
                            isInvalid={!!errors.age}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.age}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>

                <div className="col-md-6">
                    {/* Weight */}
                    <Form.Group>
                        <Form.Label>Weight (kg)</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter weight"
                            name="weight"
                            value={animal.weight}
                            onChange={handleChange}
                            min="0"
                            max="1000"
                            step="0.1"
                            isInvalid={!!errors.weight}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.weight}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>
            </div>

            {/* Description Section */}
            <div className="mb-3">
                {/* Description */}
                <Form.Group className="mb-3">
                    <Form.Label>Brief Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Enter a brief description"
                        name="description"
                        value={animal.description}
                        rows={1}
                        style={{ maxHeight: '100px' }}
                        onChange={handleChange}
                        isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.description}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Long Description */}
                <Form.Group>
                    <Form.Label>Detailed Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Enter a detailed description"
                        name="longDescription"
                        value={animal.longDescription}
                        rows={1}
                        style={{ maxHeight: '200px' }}
                        onChange={handleChange}
                        isInvalid={!!errors.longDescription}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.longDescription}
                    </Form.Control.Feedback>
                </Form.Group>
            </div>

            {/* Status Section */}
            <div className="mb-3">
                {/* Adoption Status */}
                <Form.Group>
                    <Form.Label>Adoption Status *</Form.Label>
                    <Form.Select
                        name="adoptionStatus"
                        value={animal.adoptionStatus}
                        onChange={handleChange}
                        isInvalid={!!errors.adoptionStatus}
                    >
                        <option value="" hidden>Select adoption status</option>
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                        <option value="Adopted">Adopted</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {errors.adoptionStatus}
                    </Form.Control.Feedback>
                </Form.Group>
            </div>

            {errors.submit && (
                <Alert variant="danger" className="mb-4">
                    {errors.submit}
                </Alert>
            )}

            <div className="d-flex gap-3">
                <Button
                    variant="outline-secondary"
                    as={Link}
                    to="/animals"
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Processing...' : submitLabel}
                </Button>
            </div>
        </Form>
    );
};

export default AnimalForm;
