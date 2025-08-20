import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert, Button, Image } from 'react-bootstrap';
import DonationCard from "../components/donations/DonationCard";
import { getDonations } from "../api/services/donationService";
import AchievementsCard from "../components/donations/AchievementsBox";
import { FaExternalLinkAlt } from "react-icons/fa";

const Donations = () => {
    const [donations, setDonation] = useState([]); // loaded donations state
    const [loading, setLoading] = useState(true); // loading state for spinner
    const [error, setError] = useState(null); // error state for error messages
    const [amountRaised, setAmountRaised] = useState(0); // total amount raised

    useEffect(() => {
        const fetchDonations = async () => {

            setLoading(true);
            setError(null);
    
            try {
                const data = await getDonations();
                setDonation(data);
                
                const amountRaised = data.reduce((total, donation) => total + donation.amount, 0).toFixed(2);
                setAmountRaised(amountRaised);
    
            } catch (err) {
                setError('Failed to fetch donations. Please try again later.');
                console.error('Error fetching donations:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDonations();
    }, []);

    return (
        <Container className="container-fluid">
            <Row className="px-4">
                <Col xs={12} lg={7} className="mt-5 mb-4 mb-lg-5 h-100 align-items-stretch">
                    <Container 
                        className="py-4 px-4 mb-4 custom-container"
                    >
                        <h1 className="display-6 text-center fw-bold mt-3">
                            Your Support 
                            <br/>
                            Makes a Difference
                        </h1>
                    
                        <h4 className="lead mt-3 text-center">
                            Every donation helps us rescue, care for,
                            <br/>                            
                            and find new home for animals in need. 
                            <br/>                            
                            Together, we can give them a second chance.
                        </h4>

                        <div className="text-center mt-4">
                            <Button
                                variant="primary"
                                type="submit"
                                className="btn btn-lg btn-primary w-100 d-flex align-items-center justify-content-center"
                                href="/donate/payment/"
                                style={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
                            >
                                Donate now
                                <FaExternalLinkAlt className="ms-2"/>
                            </Button>
                        </div>
                    </Container>

                    <Container 
                        className="py-4 px-4 custom-container"
                    >
                        <AchievementsCard/>
                    </Container>
                </Col>
                <Col xs={12} lg={5} className="mt-lg-5 mb-lg-5 h-100 align-items-stretch">
                    <Container 
                        className="py-4 text-center custom-container"
                    >
                        <h2 className="lead">Raised this year:</h2>
                        <h1 className="display-6 fw-bold">{amountRaised}$</h1>
                    </Container>
                    
                    <Container 
                        className="custom-container my-4"
                    >
                        <h1 className="text-center mb-4 mt-4">All donations</h1>

                        {loading === true ? (
                            <Container className="text-center mt-5">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </Container>
                        ) : error ? (
                            <Container className="mt-4">
                                <Alert variant="danger">{error}</Alert>
                            </Container>
                        ) : (
                            <Container 
                                style={{
                                    overflowY: 'auto',
                                    minHeight: '95vh',
                                    maxHeight: '95vh'
                                }} 
                                className="py-4 px-4"
                            >
                                {donations.length > 0 ? (
                                    <Row xs={1} md={1}>
                                        {donations.map((donation) => (
                                            <Col key={donation.id}>
                                                <DonationCard donation={donation} />
                                            </Col>
                                        ))}
                                    </Row>
                                ) : (
                                    <div className="mt-4 d-flex justify-content-center">
                                        <Alert variant="info" className="text-center">
                                            Be our first donor.
                                        </Alert>
                                    </div>
                                )}

                                <Image
                                    src="/images/cat1.svg"
                                    alt="Cat Illustration"
                                    className="img-fluid"
                                    style={{ maxHeight: '400px', width: '100%' }}
                                />

                            </Container>
                        )}
                    </Container>
                </Col>
            </Row>  
        </Container>
    );
}

export default Donations;