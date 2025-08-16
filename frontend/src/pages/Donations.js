import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
// import { getDonations } from "../api/services/donationService";  // to add later
import DonationCard from "../components/donations/DonationCard";
import AchievementsCard from "../components/donations/AchievementsBox";


const Donations = () => {
    const [donations, setDonation] = useState([]); // loaded donations state
    const [loading, setLoading] = useState(true); // loading state for spinner
    const [error, setError] = useState(null); // error state for error messages
    
    const fetchDonations = async () => {

        setLoading(true);
        setError(null);

        try {
            // const data = await getDonations();
            const data = [
                {
                  id: 1,
                  userId: null,
                  amount: 50.00,
                  nickname: "TestUser1",
                  message: "Świetna inicjatywa, powodzenia!",
                  paymentStatus: "completed",
                  createdAt: "2025-08-12T10:30:00Z"
                },
                {
                  id: 2,
                  userId: null,
                  amount: 25.50,
                  nickname: "TestUser2",
                  message: "Trzymam kciuki za wszystkie zwierzaki!",
                  paymentStatus: "pending",
                  createdAt: "2025-08-11T14:15:00Z"
                },
                {
                    id: 3,
                    userId: null,
                    amount: 25.50,
                    nickname: "TestUser2",
                    message: "Trzymam kciuki za wszystkie zwierzaki!",
                    paymentStatus: "pending",
                    createdAt: "2025-08-11T14:15:00Z"
                  },
                  {
                    id: 4,
                    userId: null,
                    amount: 25.50,
                    nickname: "TestUser2",
                    message: "Trzymam kciuki za wszystkie zwierzaki!",
                    paymentStatus: "pending",
                    createdAt: "2025-08-11T14:15:00Z"
                  },
                  {
                    id: 5,
                    userId: null,
                    amount: 25.50,
                    nickname: "TestUser2",
                    message: "Trzymam kciuki za wszystkie zwierzaki!",
                    paymentStatus: "pending",
                    createdAt: "2025-08-11T14:15:00Z"
                  },{
                    id: 6,
                    userId: null,
                    amount: 25.50,
                    nickname: "TestUser2",
                    message: "Trzymam kciuki za wszystkie zwierzaki!",
                    paymentStatus: "pending",
                    createdAt: "2025-08-11T14:15:00Z"
                  }
              ];
              
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

        <Container className="container-fluid">
            <Row xs={1} lg={2}>
                <Col xs={12} lg={7} className="mt-4">
                    <Container 
                        style={{
                            paddingLeft: '30px', paddingRight: '30px', 
                            borderRadius: '10px', borderWidth: "3px", borderStyle: "solid",                                       
                            borderColor: "rgba(0, 0, 0, 0)",
                            backgroundColor: "rgba(242, 234, 234, 0.76)",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            marginTop: '25px', marginBottom: '25px',
                        }} 
                        className="py-4"
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
                                className="btn btn-lg btn-primary w-100"
                                href = "/donate/payment"
                                style={{
                                    backgroundColor: "rgba(0, 0, 0, 1)",
                                }}
                            >
                                Donate now
                            </Button>
                        </div>
                    </Container>

                    <Container 
                        style={{
                            paddingLeft: '30px', paddingRight: '30px',
                            borderRadius: '10px', borderWidth: "3px", borderStyle: "solid",
                            borderColor: "rgba(0, 0, 0, 0)",
                            backgroundColor: "rgba(242, 234, 234, 0.76)",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            marginTop: '25px', marginBottom: '25px',
                        }} 
                        className="py-4"
                    >
                        <AchievementsCard/>

                    </Container>
                </Col>
            
                <Col xs={12} lg={5} className="text-center mt-4">
                    <Container 
                        style={{
                            paddingLeft: '30px', paddingRight: '30px', 
                            borderRadius: '10px', borderWidth: "3px", borderStyle: "solid",                                       
                            borderColor: "rgba(0, 0, 0, 0)",
                            backgroundColor: "rgba(242, 234, 234, 0.76)",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            marginTop: '25px', marginBottom: '25px',
                        }} 
                        className="py-4"
                    >
                        <h2 className="lead">Raised this year:</h2>
                        {/* //TODO: Join this with the value from all donations */}
                        <h1 className="display-6 fw-bold">25000$</h1>
                    </Container>
                    
                    <Container 
                        style={{
                            borderRadius: '10px', borderWidth: "3px", borderStyle: "solid",
                            borderColor: "rgba(0, 0, 0, 0)", 
                            backgroundColor: "rgba(242, 234, 234, 0.76)",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            marginTop: '25px', marginBottom: '50px'
                        }}>

                        <h1 className="text-center mb-4 mt-4">All donations</h1>
            
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
                                        paddingLeft: '30px',
                                        paddingRight: '30px', overflowY: 'auto',
                                        marginBottom: '50px', minHeight: '25vh', 
                                        maxHeight: '65vh'
                                    }} 
                                    className="py-4"
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
                                </Container>
                            )
                        }
                    </Container>
                </Col>
            </Row>  
        </Container>
    );


}

export default Donations;