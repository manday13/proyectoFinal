import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Menu.css'

function Menu() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">LOGO</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="About" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                                <Link to="/about/mission" className='nav-link'>Our mission</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.2">
                                <Link to="/about/story" className='nav-link'>Our support</Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Link to="/services" className='nav-link'>Services</Link>
                        {/* <Link id="navRegister" to="/Register" className='nav-link'>Register</Link>
                        <Link id="navLogin" to="/sign" className='nav-link'>Login</Link> */}
                    </Nav>
                    <Nav className="ml-auto">
                        <Link id="navRegister" to="/Register" className="nav-link">
                            Register
                        </Link>
                        <Link id="navLogin" to="/sign" className="nav-link">
                            Login
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Menu;