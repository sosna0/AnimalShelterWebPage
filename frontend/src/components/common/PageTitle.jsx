import React from 'react';
import { Row, Col } from 'react-bootstrap';
import GoBackButton from './GoBackButton';

const PageTitle = ({ title, previousPage }) => {
    return (
        <Row className="mb-4">

            <Col md={1}>
                <GoBackButton 
                    className="me-3" 
                    previousPage={previousPage}
                />
            </Col>

            <Col md={10}>
                <h1 className="text-center m-0">
                    {title}
                </h1>
            </Col>

            <Col md={1}></Col>
            
        </Row>
    );
};

export default PageTitle;
