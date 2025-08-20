import { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card, Button, Modal, Form, Image } from "react-bootstrap";
import { updateUser, getUserByUsername, getUserByEmail } from "../api/services/userService";
import { useAuth } from "../hooks/use-auth";
import { BsPencilSquare } from "react-icons/bs";

const UserProfile = () => {
    const { user: authUser } = useAuth();
    const [user, setUser] = useState(authUser);

    const [showModal, setShowModal] = useState(false);
    const [fieldToEdit, setFieldToEdit] = useState("");
    const [newValue, setNewValue] = useState("");

    const [usernameTaken, setUsernameTaken] = useState(false);
    const [emailTaken, setEmailTaken] = useState(false);

    const handleEditClick = (field) => {
        setFieldToEdit(field);
        setNewValue("");
        setUsernameTaken(false);
        setEmailTaken(false);
        setShowModal(true);
    };

    const checkUsername = useCallback(async (value) => {
        if (!value) {
            setUsernameTaken(false);
            return;
        }
        try {
            const existingUser = await getUserByUsername(value);
            setUsernameTaken(existingUser.id !== user.id);
        } catch (err) {
            setUsernameTaken(false); // username wolny
        }
    }, [user.id]);

    const checkEmail = useCallback(async (value) => {
        if (!value) {
            setEmailTaken(false);
            return;
        }
        try {
            const existingUser = await getUserByEmail(value);
            setEmailTaken(existingUser.id !== user.id);
        } catch (err) {
            setEmailTaken(false); // email wolny
        }
    }, [user.id]);

    useEffect(() => {
        if (fieldToEdit === "username") checkUsername(newValue);
    }, [newValue, fieldToEdit, checkUsername]);

    useEffect(() => {
        if (fieldToEdit === "email") checkEmail(newValue);
    }, [newValue, fieldToEdit, checkEmail]);

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
                                isInvalid={(fieldToEdit === "username" && usernameTaken) || (fieldToEdit === "email" && emailTaken)}
                            />
                            {(fieldToEdit === "username" && usernameTaken) && (
                                <Form.Control.Feedback type="invalid">
                                    This username is already taken by another user.
                                </Form.Control.Feedback>
                            )}
                            {(fieldToEdit === "email" && emailTaken) && (
                                <Form.Control.Feedback type="invalid">
                                    This email is already taken by another user.
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleSave} 
                        disabled={
                            !newValue || 
                            (fieldToEdit === "username" && usernameTaken) || 
                            (fieldToEdit === "email" && emailTaken)
                        }
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default UserProfile;
