import React from 'react';
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';
import { format } from 'date-fns';
import { RoleOnly } from '../access/RoleOnly';

const AdoptionCard = ({ 
    adoption, 
    animal,
    onDetails,
    onDelete 
}) => {

    // Get the status variant for the badge
    const getStatusVariant = (status) => {
        switch (status) {
            case 'Pending': return 'warning';
            case 'OnHold': return 'info';
            case 'Approved': return 'success';
            case 'Rejected': return 'danger';
            default: return 'secondary';
        }
    };

    return (
        <Card className="border shadow-sm">
            <Card.Body>
                <Row className="align-items-center">

                    {/* Status Badge and Animal Name */}
                    <Col xs={6} md={4} className="mb-2 mb-md-0">
                        <div className="d-flex align-items-center gap-2">
                            <Badge bg={getStatusVariant(adoption.status)} className='fs-6'>
                                {adoption.status}
                            </Badge>
                            <h5 className="mb-0">
                                {animal?.name || 'Unknown Animal'}
                            </h5>
                        </div>
                    </Col>

                    {/* Submission Date */}
                    <Col xs={6} md={4} className="mb-2 mb-md-0">
                        <div className="text-muted">
                            {format(new Date(adoption.createdAt), 'PPpp')}
                        </div>
                    </Col>

                    {/* Action Buttons */}
                    <Col xs={12} md={4}>
                        <div className="d-flex gap-2 justify-content-md-end">
                            <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => onDetails(adoption.id)}
                            >
                                View Details
                            </Button>
                            <RoleOnly allowedRoles={['public']}>
                                {onDelete && adoption.status === 'Pending' && (
                                    <Button 
                                        variant="outline-danger" 
                                        size="sm"
                                        onClick={() => onDelete(adoption.id)}
                                    >
                                        Cancel Request
                                    </Button>
                                )}
                            </RoleOnly>
                        </div>
                    </Col>
                    
                </Row>
            </Card.Body>
        </Card>
    );
};

export default AdoptionCard;
