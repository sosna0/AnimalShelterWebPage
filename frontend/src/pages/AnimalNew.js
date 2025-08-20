import React from "react";
import { Container, Card } from 'react-bootstrap';
import AnimalForm from "../components/animals/AnimalForm";
import PageTitle from "../components/common/PageTitle";

const AnimalNew = () => {

    return (
        <Container className="py-4">
            
            <PageTitle 
                title="Add New Animal" 
                previousPage="/animals" 
            />

            <Card className="border shadow">
                <Card.Body>
                    <AnimalForm submitLabel="Add Animal" />
                </Card.Body>
            </Card>

        </Container>
    );
}

export default AnimalNew;