import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { getUserById, updateUser } from "../api/services/userService";
import { useAuth } from "../hooks/use-auth";

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
      // aktualizujemy lokalny stan
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
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          {fields.map((field) => (
            <Card className="mb-3" key={field.key}>
              <Card.Body className="d-flex align-items-center justify-content-between text-start">
                <div>
                  <Card.Subtitle className="mb-1 text-muted">{field.label}</Card.Subtitle>
                  <Card.Text>
                    {field.key === "password" ? "••••••••" : user[field.key]}
                  </Card.Text>
                </div>
                <Button variant="outline-primary" onClick={() => handleEditClick(field.key)}>
                  Edit
                </Button>
              </Card.Body>
            </Card>
          ))}
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
