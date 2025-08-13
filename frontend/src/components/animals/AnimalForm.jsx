import React, { useState } from "react";
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { createAnimal, updateAnimal } from "../../api/services/animalService";

const AnimalForm = ({
    initialData = { name: '', species: '', age: '', weight: '', gender: '', description: '', adoptionStatus: '' },
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
        if (!animal.age) {
            formErrors.age = "Age is required";
        } else {
            const age = parseFloat(animal.age);
            if (isNaN(age) || age < 0 || age > 100) {
                formErrors.age = "Age must be a number between 0 and 100";
            }
        }
        // weight validation (required and positive)
        if (!animal.weight) {
            formErrors.weight = "Weight is required";
        } else {
            const weight = parseFloat(animal.weight);
            if (isNaN(weight) || weight <= 0) {
                formErrors.weight = "Weight must be a positive number";
            }
        }
        // gender validation
        if (!animal.gender) {
            formErrors.gender = "Gender is required";
        }
        // description validation
        if (!animal.description?.trim()) {
            formErrors.description = "Description is required";
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
            name: animal.name.trim(),
            age: parseInt(animal.age),
            weight: parseFloat(animal.weight),
            description: animal.description.trim(),
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

            {/* Name */}
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
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

            {/* Species */}
            <Form.Group className="mb-3">
                <Form.Label>Species</Form.Label>
                <Form.Select
                    name="species"
                    value={animal.species}
                    onChange={handleChange}
                    isInvalid={!!errors.species}
                >
                    <option value="" hidden>Select species</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="other">Other</option>
                    </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {errors.species}
                </Form.Control.Feedback>
            </Form.Group>

            {/* Age */}
            <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter age in years"
                    name="age"
                    value={animal.age}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="1"
                    isInvalid={!!errors.age}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.age}
                </Form.Control.Feedback>
            </Form.Group>

            {/* Weight */}
            <Form.Group className="mb-3">
                <Form.Label>Weight</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter weight in kg"
                    name="weight"
                    value={animal.weight}
                    onChange={handleChange}
                    min="0"
                    step="0.1"
                    isInvalid={!!errors.weight}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.weight}
                </Form.Control.Feedback>
            </Form.Group>

            {/* Gender */}
            <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                    name="gender"
                    value={animal.gender}
                    onChange={handleChange}
                    isInvalid={!!errors.gender}
                >
                    <option value="" hidden>Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unknown">Unknown</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {errors.gender}
                </Form.Control.Feedback>
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter a brief description"
                    name="description"
                    value={animal.description}
                    onChange={handleChange}
                    isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.description}
                </Form.Control.Feedback>
            </Form.Group>

            {/* Adoption Status */}
            <Form.Group className="mb-3">
                <Form.Label>Adoption Status</Form.Label>
                <Form.Select
                    name="adoptionStatus"
                    value={animal.adoptionStatus}
                    onChange={handleChange}
                    isInvalid={!!errors.adoptionStatus}
                >
                    <option value="" hidden>Select adoption status</option>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                    <option value="adopted">Adopted</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {errors.adoptionStatus}
                </Form.Control.Feedback>
            </Form.Group>

            {errors.submit && (
                <Alert variant="danger" className="mt-3">
                    {errors.submit}
                </Alert>
            )}

            <div className="mt-4">
                <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Processing...' : submitLabel}
                </Button>
                <Button
                    variant="secondary"
                    as={Link}
                    to="/animals"
                    className="ms-2"
                    disabled={loading}
                >
                    Cancel
                </Button>
            </div>
        </Form>
    );
};

export default AnimalForm;
