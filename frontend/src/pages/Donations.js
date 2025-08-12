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

    return (

        // TODO: Change this
        <div>
            <p>Here you can donate to our shelter.</p>
            <p>All donations are used to help our animals.</p>
            <p>Thank you for your support!</p>
            <p>Click <a href="/donate">here</a> to donate.</p>
            

        


        <Container 
            style={{ maxWidth: '750px', margin: '0 auto', paddingLeft: '30px', paddingRight: '30px' }} 
            className="py-4">

            <h1 className="text-center mb-4">All donations</h1>

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

        </div>
    );


}

export default Donations;