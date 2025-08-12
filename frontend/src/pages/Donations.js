import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { getDonations } from "../api/services/donationService";
import DonationCard from "../components/donations/DonationCard";


const Donations = () => {
    const [donations, setDonation] = useState([]); // loaded donations state
    const [loading, setLoading] = useState(true); // loading state for spinner
    const [error, setError] = useState(null); // error state for error messages
    
    const fetchDonations = async () => {

        setLoading(true);
        setError(null);

        try {
            const data = await getDonations();
            // const data = [
            //     {
            //       id: 1,
            //       userId: null,
            //       amount: 50.00,
            //       nickname: "TestUser1",
            //       message: "Świetna inicjatywa, powodzenia!",
            //       paymentStatus: "completed",
            //       createdAt: "2025-08-12T10:30:00Z"
            //     },
            //     {
            //       id: 2,
            //       userId: null,
            //       amount: 25.50,
            //       nickname: "TestUser2",
            //       message: "Trzymam kciuki za wszystkie zwierzaki!",
            //       paymentStatus: "pending",
            //       createdAt: "2025-08-11T14:15:00Z"
            //     }
            //   ];
              
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

        <Container>
            <Row xs={1} lg={2}>
                <Col className="text-center mt-4">
                    <Container className="mb-4">
                        <p>Here you can donate to our shelter.</p>
                        <p>All donations are used to help our animals.</p>
                        <p>Thank you for your support!</p>
                        <p>
                            Click <a href="/donate/payment">here</a> to donate.
                        </p>
                    </Container>
                </Col>
            
                <Col className="text-center mt-4">
                    <h1 className="text-center mb-4">All donations</h1>
            
                    {loading === true ? (
                        <Container className="text-center mt-5">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </Container>
                        ): error ? (
                            <Container className="mt-4">
                                <Alert variant="danger">{error}</Alert>
                            </Container>
                        ) : (
                            <Container 
                                style={{
                                        maxWidth: '750px', minWidth: '25hh', paddingLeft: '30px',
                                        paddingRight: '30px', overflowY: 'auto',
                                        borderRadius: '10px', borderWidth: "3px", borderStyle: "solid",
                                        borderColor: "rgb(230, 126, 34)", 
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                        marginBottom: '50px', minHeight: '25vh', maxHeight: '68vh'
                                    }} 
                                className="py-4">

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
                            </Container>
                        )
                    }
                </Col>
            </Row>  
        </Container>
    );


}

export default Donations;