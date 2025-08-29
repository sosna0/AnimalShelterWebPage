import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert, Button, Image } from 'react-bootstrap';
import DonationCard from "../components/donations/DonationCard";
import { getDonationsByUserId } from "../api/services/donationService";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useAuth } from "../hooks/use-auth";

const UserDonations = () => {
    const [donations, setDonation] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const { user } = useAuth();

    const fetchDonations = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getDonationsByUserId(user.id);
            setDonation(data);
        } catch (err) {
            setError('Failed to fetch donations. Please try again later.');
            console.error('Error fetching donations:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDonations();
    }, []);

    return (
        <Container className="my-4 container-fluid">  
            <Row className="justify-content-center">
                <Col className="d-flex flex-column align-items-center justify-content-center">         
                    <Container 
                        className="d-flex flex-column align-items-center justify-content-center custom-container"
                        style={{
                            maxHeight: "auto", maxWidth: "1000px",
                        }}
                    >
                        {loading ? (
                            <Container className="text-center mt-5">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </Container>
                        ) : error ? (
                            <Container className="mt-4">
                                <Alert variant="danger">{error}</Alert>
                            </Container>
                        ) : donations.length > 0 ? (
                            <>
                                <h1 className="text-center mb-4 mt-4">Your Donations</h1>
                                <Container 
                                    style={{
                                        paddingLeft: '20px',
                                        paddingRight: '20px',
                                        overflowY: 'auto',
                                        minHeight: 0,
                                        maxHeight: '50vh',
                                    }} 
                                >
                                    <Row xs={1} md={1}>
                                        {donations.map((donation) => (
                                            <Col className=" mt-3" key={donation.id}>
                                                <DonationCard donation={donation} />
                                            </Col>
                                        ))}
                                    </Row>
                                </Container>
                            </>
                        ) : (
                            <Container 
                                style={{
                                    paddingLeft: '30px', paddingRight: '30px', 
                                    marginBottom: '25px', marginTop: '25px'
                                }} 
                                className="py-4"
                            >                                    
                                <h1 className="display-6 text-center fw-bold mt-3">
                                    Make your first donation
                                </h1>

                                <div className="text-center mt-4">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="btn btn-lg btn-primary d-flex align-items-center justify-content-center mx-auto"
                                        href="/donations"
                                        style={{
                                            backgroundColor: "rgba(0, 0, 0, 1)",
                                            maxWidth: "75%",
                                            width: "100%",
                                        }}
                                    >
                                        Here
                                        <FaExternalLinkAlt className="ms-2"/>
                                    </Button>
                                </div>
                            </Container>
                        )}
                        
                        <Image
                            src="/images/dog1.svg"
                            alt="Dog Illustration"
                            className="img-fluid"
                            style={{ maxHeight: '300px', width: '100%' }}
                        />

                    </Container> 
                </Col>
            </Row> 
        </Container>
    );
}

export default UserDonations;
