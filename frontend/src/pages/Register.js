import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { getUserByUsername, getUserByEmail } from "../api/services/userService";
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';


const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [usernameTaken, setUsernameTaken] = useState(false);
    const [emailTaken, setEmailTaken] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const checkUsername = useCallback( async () => {
        if (!username) {
            setUsernameTaken(false);
            return;
        }
        try {
            await getUserByUsername(username);
            setUsernameTaken(true); // user istnieje
        } catch (err) {
            setUsernameTaken(false); // user nie istnieje (404)
        }
    }, [username]);

    const checkEmail = useCallback( async () => {
        if (!email) {
            setEmailTaken(false);
            return;
        }
        try {
            await getUserByEmail(email);
            setEmailTaken(true); // email zajęty
        } catch (err) {
            setEmailTaken(false); // email wolny
        }
    }, [email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (usernameTaken || emailTaken) return;

        setIsSubmitting(true);
        try {
            await register({ name, surname, username, email, password });
        navigate('/');
    } catch (error) {
            alert('Cannot create account. Please check your data.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // debounce-like behavior
    useEffect(() => {
        const timer = setTimeout(() => checkUsername(), 500);
        return () => clearTimeout(timer);
    }, [checkUsername]);

    useEffect(() => {
        const timer = setTimeout(() => checkEmail(), 500);
        return () => clearTimeout(timer);
    }, [checkEmail]);

    const isFormInvalid =
        !name || !surname || !username || !email || !password || usernameTaken || emailTaken;


    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh' }}
        >
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4}>
                    <Card className="p-4 shadow">
                        <div className="position-relative text-center mb-4">
                            <Button
                                variant="link"
                                onClick={() => navigate('/login')}
                                className="position-absolute start-0 top-0 mt-1 ms-1 p-0"
                                style={{ color: "black" }}
                                aria-label="Back to login"
                            >
                                <i className="bi bi-arrow-left"></i>
                            </Button>
                            <h2 className="m-0">Register</h2>
                        </div>
    
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="John"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Form.Group>
    
                            <Form.Group className="mb-3" controlId="surname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Doe"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                    required
                                />
                            </Form.Group>
    
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="johndoe"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    isInvalid={usernameTaken}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    This username is already taken.
                                </Form.Control.Feedback>
                            </Form.Group>
    
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    isInvalid={emailTaken}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    This email is already registered.
                                </Form.Control.Feedback>
                            </Form.Group>
    
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
    
                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100 custom-btn"
                                disabled={isFormInvalid || isSubmitting}
                            >
                                {isSubmitting ? 'Creating...' : 'Create Account'}
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
        
};

export default Register;
