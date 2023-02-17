import { Navbar, Nav, Container, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { serverURL } from '..';
import './NavBar.css';

function NavBar() {
	const [, setUser] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(`${serverURL}/api/user`);
            setUser(await res.json())
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
                    <Nav>
                        <Nav.Link href="/" active={window.location.pathname === '/'}>
                            Home
                        </Nav.Link>
                        <Nav.Link href="/learning-journal" active={window.location.pathname === '/learning-journal'}>
                            Learning Journal
                        </Nav.Link>
                    </Nav>

                    <Nav className="flex-grow-1 justify-content-end">
                        {window.location.pathname !== '/login' && window.location.pathname !== '/signup' && (
                            <>
                                <div style={{ width: 10, height: 20 }} />
                                <Form className="flex-grow-1 search-bar">
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <i className="bi-search"></i>
                                        </InputGroup.Text>
                                        <Form.Control type="search" placeholder="Search" className="me-2 search-input" aria-label="Search" name="filter" />
                                    </InputGroup>
                                </Form>
                                <div style={{ height: 20 }} />
                            </>
                        )}
                        <Nav.Link href="/login" active={window.location.pathname === '/login'}>
                            Login
                        </Nav.Link>
                        <Nav.Link href="/signup" active={window.location.pathname === '/signup'}>
                            Sign Up
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
