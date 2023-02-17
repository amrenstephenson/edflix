import { Navbar, Nav, NavDropdown, Container, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { serverURL } from '..';

function NavBar() {
	const [user, setUser] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            const res = fetch(`${serverURL}/api/user`);
            setUser((await res).json())
        }
        
        fetchUser()
            .catch(console.error);
    }, [])

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <img src="images/edflix-logo.png" alt="Edflix logo" style={{ height: '2rem' }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav d-flex">
                    <Nav className="flex-grow-1">
                        <Nav.Link href="/" active={window.location.pathname === '/'}>
                            Home
                        </Nav.Link>
                        <Nav.Link href="/learning-journal" active={window.location.pathname === '/learning-journal'}>
                            Learning Journal
                        </Nav.Link>
                    </Nav>

                    <Nav className="flex-grow-1 justify-content-end">
                        <Nav.Link href="/login" active={window.location.pathname === '/login'}>
                            Login
                        </Nav.Link>
                        <Nav.Link href="/signup" active={window.location.pathname === '/signup'}>
                            Sign Up
                        </Nav.Link>
                        {window.location.pathname !== '/login' && window.location.pathname !== '/signup' && (
                            <>
                                <div style={{ width: 20, height: 20 }} />
                                <Form>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <i className="bi-search"></i>
                                        </InputGroup.Text>
                                        <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" name="filter" />
                                    </InputGroup>
                                </Form>
                                <div style={{ height: 20 }} />
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
