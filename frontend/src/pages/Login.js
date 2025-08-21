import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ username, password });
            navigate('/'); // Redirect to home after successful login
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        }
    };

    const isFormValid = username.trim() !== '' && password.trim() !== '';

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh' }}
        >
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4}>
                    <Card className="p-4 shadow">
                        <h2 className="text-center mb-4">Sign In</h2>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Enter Your Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Enter Your Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100 custom-btn"
                                disabled={!isFormValid}
                            >
                                Sign In
                            </Button>
                        </Form>

                        <div className="mt-3 text-center">
                            <div>Don't have an account?</div>
                            <div>
                                Click <Link to="/register">here</Link> to register
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
