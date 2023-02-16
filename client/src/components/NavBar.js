import { Navbar, Nav, NavDropdown, Container, Form, InputGroup } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

function NavBar() {
	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Container>
				<Navbar.Brand href="/">
					<img src="images/edflix-logo.png" alt="Edflix logo" style={{ height: "2rem" }} />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/" active>Home</Nav.Link>
						<Nav.Link href="#link">Link</Nav.Link>
						<Nav.Link href="/sign">Sign</Nav.Link>
						<Nav.Link href="/LearningJournal">LearningJournal</Nav.Link>
						<NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>

					<Form className="d-flex">
						<InputGroup>
							<InputGroup.Text>
								<i className="bi-search"></i>
							</InputGroup.Text>
							<Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" name="filter" />
						</InputGroup>
					</Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavBar;
