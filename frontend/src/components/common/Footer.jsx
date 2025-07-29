import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-light mt-auto py-2 border-top">
            <Container>
                <Row className="align-items-center">
                    <Col md={4} className="text-center text-md-start">
                        <span className="text-muted">© {new Date().getFullYear()} Animal Shelter</span>
                    </Col>
                    <Col md={4} className="text-center d-none d-md-block">
                        <div className="d-flex justify-content-center gap-3">
                            <Link to="/about" className="text-muted text-decoration-none">About</Link>
                            <Link to="/contact" className="text-muted text-decoration-none">Contact</Link>
                            <Link to="/privacy" className="text-muted text-decoration-none">Privacy</Link>
                        </div>
                    </Col>
                    <Col md={4} className="text-center text-md-end">
                        <div className="d-flex justify-content-center justify-content-md-end gap-3">
                            <a href="https://www.facebook.com" className="text-muted" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
                            <a href="https://www.twitter.com" className="text-muted" aria-label="Twitter"><i className="bi bi-twitter"></i></a>
                            <a href="https://www.instagram.com" className="text-muted" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
