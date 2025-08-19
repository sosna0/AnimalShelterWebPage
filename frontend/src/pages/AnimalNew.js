import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import AnimalForm from "../components/animals/AnimalForm";
import GoBackButton from "../components/common/GoBackButton";

const AnimalNew = () => {

    return (
        <Container className="py-4">
            <Row className="mb-4">
                <Col md={1}>
                    <GoBackButton 
                        className="me-3" 
                        previousPage="/animals"
                    />
                </Col>
                <Col md={10}>
                    <h1 className="text-center m-0">Add New Animal</h1>
                </Col>
                <Col md={1}></Col>
            </Row>
            <AnimalForm submitLabel="Add Animal" />
        </Container>
    );
}

export default AnimalNew;