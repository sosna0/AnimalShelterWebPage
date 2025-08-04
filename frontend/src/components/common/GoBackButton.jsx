import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    }
    
    return (
        <Button
            variant="light"
            onClick={handleGoBack}
            className="border rounded d-flex align-items-center justify-content-center"
            style={{ width: '50px', height: '50px' }}
        >
            <i className="bi bi-arrow-left" />
        </Button>
    );
}

export default GoBackButton;