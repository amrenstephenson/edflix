import { Navbar, Nav, Container, Form, InputGroup, NavDropdown } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { serverURL } from '..';
import './NavBar.css';

function getInitials(name) {
    const nameComponents = name.split(' ');
    var initials = nameComponents[0].charAt(0);
    if (nameComponents.length > 1) {
        initials += nameComponents[nameComponents.length - 1].charAt(0);
    }
    return initials.toUpperCase();
}

function NavBar() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(`${serverURL}/api/user`);
            if (res.status === 200) {
                setUser(await res.json());
            } else {
                setUser(false);
            }
        };

        fetchUser().catch(console.error);
    }, []);

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
                        {user && (
                            <NavDropdown
                                title={
                                    <span style={{ height: 30, width: 30, borderRadius: 15, display: 'inline-block', backgroundColor: 'hsl(210, 11%, 25%)', backgroundImage: user.ProfilePicture ? `url(${user.ProfilePicture})` : '' }}>
                                        <span style={{ height: 30, width: 30, borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: user.ProfilePicture ? 'transparent' : 'rgb(208, 0, 34)' }}>
                                            <b style={{ fontSize: 14, color: user.ProfilePicture ? 'transparent' : '#ddd' }}>{getInitials(user.User_name)}</b>
                                        </span>
                                    </span>
                                }
                                id="navbarScrollingDropdown"
                                align="end"
                            >
                                <div style={{ paddingTop: '0.5rem', paddingBottom: '0.75rem', paddingLeft: '1rem', paddingRight: '1rem', borderBottom: '1px solid hsl(210, 11%, 25%)', marginBottom: '0.5rem' }}>
                                    Logged in as
                                    <br />
                                    <b>{user.User_name}</b>
                                </div>
                                <NavDropdown.Item href="/api/logout">Logout</NavDropdown.Item>
                            </NavDropdown>
                        )}
                        {user === false && window.location.pathname !== '/login' && window.location.pathname !== '/signup' && (
                            <Nav.Link href="/login" active={window.location.pathname === '/login'}>
                                Login
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
