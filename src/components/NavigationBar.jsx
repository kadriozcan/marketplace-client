import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "../provider/AuthContext";
import { logout } from "../utils/ApiFunctions";
import { Button } from "react-bootstrap";

const NavigationBar = () => {

    const { setIsAuthenticated } = useAuth();

    const handleLogout = async () => {
        try {
            await logout()
            setIsAuthenticated(false);
            localStorage.removeItem('isAuthenticated');
        } catch (err) {
            console.error('Error logging out:', err);
        }
    };



    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">BestProducts</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/my-favorites">Favorites</Nav.Link>
                        <Nav.Link href="/blacklists">Blacklist</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Button onClick={handleLogout} variant="outline-danger">
                        Logout
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
};

export default NavigationBar;
