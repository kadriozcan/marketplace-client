import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { login } from "../utils/ApiFunctions";
import { useAuth } from "../provider/AuthContext";

const Login = () => {
    const { setIsAuthenticated, setUserId, setRoles } = useAuth()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            setError("Username and password are required");
        } else {
            setError("");
            try {
                const response = await login(username, password);
                console.log("login response : ", response)
                if (response.status == 200) {
                    setIsAuthenticated(true)
                    setUserId(response.data.userId)
                    setRoles(response.data.roles)
                }
                console.log("Login successful", response);
                navigate("/"); // Redirect to homepage on successful login
            } catch (err) {
                setError("Login failed. Please try again.");
            }
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "50vh" }}
        >
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <h2 className="text-center my-4">Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </Form.Group>
                        {error && (
                            <Alert variant="danger" className="mt-3">
                                {error}
                            </Alert>
                        )}
                        <Button type="submit" className="w-100 mt-3">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
