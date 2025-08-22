import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../hooks/use-auth';
import { createAdoption } from '../../api/services/adoptionService';

const AdoptionForm = ({ 
    animal, 
    onSuccess, 
    onCancel 
}) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({ personalInfo: '', livingConditions: '', petExperience: '', lifestyle: '', additionalInfo: '' });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const requiredFields = ['personalInfo', 'livingConditions', 'petExperience', 'lifestyle'];
        const emptyFields = requiredFields.filter(field => !formData[field].trim());
        
        if (emptyFields.length > 0) {
            setError('Please fill in all required fields.');
            return false;
        }

        const totalLength = Object.values(formData).join('').length;
        if (totalLength > 2000) {
            setError('Your application is too long. Please be more concise.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setError('');

        try {
            const surveyData = `
Personal Information:
${formData.personalInfo}

Living Conditions:
${formData.livingConditions}

Pet Experience:
${formData.petExperience}

Lifestyle & Commitment:
${formData.lifestyle}

Additional Information:
${formData.additionalInfo}`.trim();

            const result = await createAdoption({
                userId: user.id,
                animalId: animal.id,
                survey: surveyData,
            });

            if (onSuccess) {
                onSuccess(result);
            } else {
                window.location.href = '/user/adoptions';
            }

        } catch (err) {
            console.error('Adoption creation error:', err);
            setError(err.response?.data?.error || 'Failed to submit adoption application.');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>

            <h5 className="mb-3">Adoption Application</h5>

            {/* Personal Information */}
            <Form.Group className="mb-2">
                <Form.Label>Personal Information *</Form.Label>
                <Form.Control
                    as="textarea"
                    name="personalInfo"
                    value={formData.personalInfo}
                    onChange={handleInputChange}
                    rows={1}
                    style={{ maxHeight: '100px' }}
                />
            </Form.Group>

            {/* Living Conditions */}
            <Form.Group className="mb-2">
                <Form.Label>Living Conditions *</Form.Label>
                <Form.Control
                    as="textarea"
                    name="livingConditions"
                    value={formData.livingConditions}
                    onChange={handleInputChange}
                    rows={1}
                    style={{ maxHeight: '100px' }}
                />
            </Form.Group>

            {/* Pet Experience */}
            <Form.Group className="mb-2">
                <Form.Label>Pet Experience *</Form.Label>
                <Form.Control
                    as="textarea"
                    name="petExperience"
                    value={formData.petExperience}
                    onChange={handleInputChange}
                    rows={1}
                    style={{ maxHeight: '100px' }}
                />
            </Form.Group>

            {/* Lifestyle & Commitment */}
            <Form.Group className="mb-2">
                <Form.Label>Lifestyle & Commitment *</Form.Label>
                <Form.Control
                    as="textarea"
                    name="lifestyle"
                    value={formData.lifestyle}
                    onChange={handleInputChange}
                    rows={1}
                    style={{ maxHeight: '100px' }}
                />
            </Form.Group>

            {/* Additional Information */}
            <Form.Group className="mb-2">
                <Form.Label>Additional Information</Form.Label>
                <Form.Control
                    as="textarea"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    rows={1}
                    style={{ maxHeight: '100px' }}
                />
            </Form.Group>

            {error && (
                <Alert variant="danger" className="my-3">
                    {error}
                </Alert>
            )}

            <div className="d-flex gap-3 mt-3">
                <Button
                    variant="outline-secondary"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                >
                    Submit
                </Button>
            </div>
        </Form>
    );
};

export default AdoptionForm;
    