import React from "react";
import { Container } from 'react-bootstrap';
import AnimalForm from "../components/animals/AnimalForm";
import PageTitle from "../components/common/PageTitle";

const AnimalNew = () => {

    return (
        <Container className="py-4">

            <PageTitle 
                title="Add New Animal" 
                previousPage="/animals" 
            />

            <AnimalForm submitLabel="Add Animal" />
            
        </Container>
    );
}

export default AnimalNew;