import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const AdoptionStatusCounts = ({ adoptions }) => {
    const counts = adoptions.reduce((acc, adoption) => {
        acc[adoption.status] = (acc[adoption.status] || 0) + 1;
        return acc;
    }, {});

    const statusConfig = [
        { status: 'Pending', variant: 'warning', label: 'Pending' },
        { status: 'OnHold', variant: 'info', label: 'On Hold' },
        { status: 'Approved', variant: 'success', label: 'Approved' },
        { status: 'Rejected', variant: 'danger', label: 'Rejected' }
    ];

    return (
        <Row className="mb-4 g-3">
            {statusConfig.map(({ status, variant, label }) => (
                <Col key={status} xs={6} md={3}>
                    <Card className="h-100 border shadow-sm">
                        <Card.Body className="text-center p-3">
                            <div className={`h3 mb-2 text-${variant}`}>
                                {counts[status] || 0}
                            </div>
                            <div className="text-muted small text-uppercase fw-bold">
                                {label}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default AdoptionStatusCounts;
