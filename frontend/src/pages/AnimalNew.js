import React from "react";
import { Container } from 'react-bootstrap';
import AnimalForm from "../components/animals/AnimalForm";

const AnimalNew = () => {

    return (
        <Container className="py-4">
            <h1 className="text-center mb-4">Add New Animal</h1>
            <AnimalForm submitLabel="Add Animal" />
        </Container>
    );
}

export default AnimalNew;