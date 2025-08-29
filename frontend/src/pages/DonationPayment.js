import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { createDonation } from "../api/services/donationService";
import { useAuth } from "../hooks/use-auth";

const DonationNew = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const MESSAGE_LIMIT = 250;

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        nickname: "",
        message: "",
        email: "",
        country: "",
        phonePrefix: "+48",
        phoneNumber: "",
        donationAmount: "",
        paymentMethod: ""
    });

    const isFormInvalid = Object.entries(formData).some(([key, val]) => {
        if (key === "message") return false; // opcjonalny komentarz
        return !val;
    });

    const handleChange = (field, value) => {
        if (field === "message" && value.length > MESSAGE_LIMIT) {
            return; // blokuj nadpisywanie powyżej limitu
        }
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const donation = {
            userId: user ? user.id : null,
            amount: parseFloat(formData.donationAmount),
            nickname: formData.nickname,
            message: formData.message || null,
            paymentStatus: "pending"
        };

        try {
            await createDonation(donation);
            navigate("/donations/payment/processing")
        } catch (error) {
            console.error("Error creating donation:", error);
            alert("There was an error creating your donation.");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" 
            style={{
                minHeight: "100vh",
                marginTop: "6rem",
                marginBottom: "6rem" 
            }}>

            <Card style={{ maxWidth: "600px", width: "100%" }} className="p-4 shadow">
                <div className="position-relative text-center mb-4">
                    <Button
                        variant="link"
                        onClick={() => navigate('/donations')}
                        className="position-absolute start-0 top-0 mt-1 ms-1 p-0"
                        aria-label="Back to donate page"
                    >
                        <i className="bi bi-arrow-left"></i>
                    </Button>
                    <h2 className="m-0">Support our Mission</h2>
                </div>

                <Form onSubmit={handleSubmit}>
                    {/* First + Last Name */}
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={(e) => handleChange("firstName", e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={(e) => handleChange("lastName", e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Nickname */}
                    <Form.Group controlId="nickname" className="mb-3">
                        <Form.Label>Nickname</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="CoolDonor123"
                            value={formData.nickname}
                            onChange={(e) => handleChange("nickname", e.target.value)}
                            required
                        />
                    </Form.Group>

                    {/* Message (optional) */}
                    <Form.Group controlId="message" className="mb-3">
                        <Form.Label>Message (optional)</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Share your thoughts..."
                            value={formData.message}
                            onChange={(e) => handleChange("message", e.target.value)}
                        />
                        <div className="text-end text-muted small">
                            {formData.message.length} / {MESSAGE_LIMIT}
                        </div>
                    </Form.Group>

                    {/* Email */}
                    <Form.Group controlId="email" className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            required
                        />
                    </Form.Group>

                    {/* Country + Phone */}
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="country">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Poland"
                                    value={formData.country}
                                    onChange={(e) => handleChange("country", e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="phonePrefix">
                                <Form.Label>Prefix</Form.Label>
                                <Form.Select
                                    value={formData.phonePrefix}
                                    onChange={(e) => handleChange("phonePrefix", e.target.value)}
                                    required
                                >
                                    <option value="+48">+48</option>
                                    <option value="+44">+44</option>
                                    <option value="+1">+1</option>
                                    <option value="+49">+49</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="phoneNumber">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="123456789"
                                    value={formData.phoneNumber}
                                    onChange={(e) => handleChange("phoneNumber", e.target.value)}
                                    pattern="[0-9]{9,15}"
                                    inputMode="numeric"
                                    minLength={9}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Donation Amount */}
                    <Form.Group controlId="donationAmount" className="mb-3">
                        <Form.Label>Donation Amount</Form.Label>
                        <Form.Control
                            type="number"
                            min="0.01"
                            step="0.01"
                            placeholder="50"
                            value={formData.donationAmount}
                            onChange={(e) => handleChange("donationAmount", e.target.value)}
                            required
                        />
                    </Form.Group>

                    {/* Payment Method */}
                    <Form.Group controlId="paymentMethod" className="mb-4">
                        <Form.Label>Payment Method</Form.Label>
                        <Form.Select
                            value={formData.paymentMethod}
                            onChange={(e) => handleChange("paymentMethod", e.target.value)}
                            required
                        >
                            <option value="">-- Select Payment Method --</option>
                            <option value="credit_card">Credit Card</option>
                            <option value="paypal">PayPal</option>
                            <option value="bank_transfer">Bank Transfer</option>
                        </Form.Select>
                    </Form.Group>

                    {/* Submit */}
                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100"
                        disabled={isFormInvalid}
                    >
                        Donate
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default DonationNew;
