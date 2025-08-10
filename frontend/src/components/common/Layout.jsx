import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "react-bootstrap";

const Layout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <Container fluid className="p-0 flex-grow-1" style={{ marginTop: '67px' }}>
                {children}
            </Container>
            <Footer />
        </div>
    );
}

export default Layout;