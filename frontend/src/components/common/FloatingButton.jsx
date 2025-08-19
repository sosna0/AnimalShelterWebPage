import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FloatingButton = ({ 
    to = '/', 
    children = '+', 
    variant = 'primary', 
    title = null,
    bottom = '2rem',
    right = '2rem',
}) => {
    return (
        <Button
            as={Link}
            to={to}
            variant={variant}
            title={title}
            className="position-fixed d-flex align-items-center justify-content-center"
            style={{
                bottom: bottom,
                right: right,
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                fontSize: '24px',
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.3)',
                zIndex: 1000
            }}
        >
            {children}
        </Button>
    );
};

export default FloatingButton;
