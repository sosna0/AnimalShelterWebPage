import { useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Form, Image } from "react-bootstrap";
import { updateUser } from "../api/services/userService";
import { useAuth } from "../hooks/use-auth";
import { BsPencilSquare } from "react-icons/bs";

const UserProfile = () => {
    const { user: authUser } = useAuth(); // user z kontekstu auth
    const [user, setUser] = useState(authUser);

    const [showModal, setShowModal] = useState(false);
    const [fieldToEdit, setFieldToEdit] = useState("");
    const [newValue, setNewValue] = useState("");

    const handleEditClick = (field) => {
        setFieldToEdit(field);
        setNewValue("");
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            await updateUser(user.id, { [fieldToEdit]: newValue });
            setUser({ ...user, [fieldToEdit]: newValue });
            setShowModal(false);
        } catch (err) {
            console.error(err);
            alert("Failed to update field.");
        }
    };

    const fields = [
        { key: "name", label: "First Name" },
        { key: "surname", label: "Last Name" },
        { key: "username", label: "Username" },
        { key: "email", label: "Email" },
        { key: "password", label: "Password" },
    ];

    //TODO: Add validation for username and email fields

    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col xs={10} md={9} lg={7} className="custom-container">
                    {fields.map((field) => (
                        <Card className="my-4" key={field.key}>
                            <Card.Body className="d-flex align-items-center justify-content-between text-start">
                                <div>
                                    <Card.Subtitle className="mb-1 text-muted">{field.label}</Card.Subtitle>
                                    <Card.Text>
                                        {field.key === "password" ? "••••••••" : user[field.key]}
                                    </Card.Text>
                                </div>
                                <Button 
                                    variant="outline-primary" 
                                    className="d-flex align-items-center justify-content-center"
                                    onClick={() => handleEditClick(field.key)}
                                >
                                    Edit
                                <BsPencilSquare className="ms-2"/>
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                    <Image
                        src="/images/cat4.svg"
                        alt="Dog Illustration"
                        className="img-fluid"
                        style={{ maxHeight: '300px', width: '100%' }}
                    />
                </Col>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit {fieldToEdit}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Old Value</Form.Label>
                            <Form.Control
                                type={fieldToEdit === "password" ? "password" : "text"}
                                value={fieldToEdit === "password" ? "••••••••" : user[fieldToEdit]}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>New Value</Form.Label>
                            <Form.Control
                                type={fieldToEdit === "password" ? "password" : "text"}
                                value={newValue}
                                onChange={(e) => setNewValue(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave} disabled={!newValue}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default UserProfile;
