import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const StatusChangeModal = ({ 
    show, 
    onHide, 
    onSubmit, 
    status, 
    response, 
    onResponseChange 
}) => {
    const getTitle = () => {
        switch (status) {
            case 'Approved': return 'Approve Adoption Request';
            case 'Rejected': return 'Reject Adoption Request';
            case 'OnHold': return 'Put Adoption Request On Hold';
            default: return 'Update Adoption Status';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <Modal 
            show={show} 
            onHide={onHide} 
            centered
            backdrop="static"
            keyboard={false}
        >
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{getTitle()}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Response Message</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={1}
                            style={{ maxHeight: '200px' }}
                            maxLength={2000}
                            value={response}
                            onChange={(e) => onResponseChange(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                    >
                        Change Status
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default StatusChangeModal;
