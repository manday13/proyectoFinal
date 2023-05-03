import { Navbar, Nav, NavDropdown, Container, Modal, Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import GlobalContext from './GlobalContext.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './Menu.css'


function Menu() {
    const { username, logout, type, id } = useContext(GlobalContext)
    const [showModal, setShowModal] = useState(false);

    const logoutside = () => {        
        logout();
        setShowModal(false);        
    }

    if (!username) {
        return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Link to="/" className="linklogo"><Navbar.Brand ><img src="./logo.png" alt="logo" /></Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="About" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">
                                    <Link to="/about/mission" className='nav-link'>Our mission</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.2">
                                    <Link to="/about/support" className='nav-link'>Our support</Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Link to="/services" className='nav-link'>Services</Link>

                        </Nav>
                        <Nav className="ml-auto">
                            <Link id="navRegister" to="/Register" className="nav-link">
                                Register
                            </Link>
                            <Link id="navLogin" to="/Signselect" className="nav-link">
                                Login
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }




    return (
        <>
        <Navbar bg="light" expand="lg">
            <Container>
                <Link to="/" className="linklogo"><Navbar.Brand ><img src="./logo2.png" alt="logo" /></Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="About" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                                <Link to="/about/mission" className='nav-link'>Our mission</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.2">
                                <Link to="/about/support" className='nav-link'>Our support</Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Link to="/services" className='nav-link'>Services</Link>

                    </Nav>
                    <Nav className="ml-auto">
                        <Dropdown  drop='start'>
                            <Dropdown.Toggle className='drops' id="dropdown-basic">
                                <span style={{color: "black"}}>{<FontAwesomeIcon icon={faUser} />}</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1"><Link to={`/perfil/${type}/${id}`} className="linklogo nav-link">Personal information</Link></Dropdown.Item>
                                {(type !== "tutor") && <Dropdown.Item href="#/action-2"><Link to="/myWork" className="nav-link">My workshops</Link></Dropdown.Item>}
                                <Dropdown.Item href="#/action-3"><span className="nav-link logout" onClick={()=>setShowModal(true)}>Log out</span></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Modal show={showModal} onHide={()=>setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title><h3>Are you sure you want to log out?</h3></Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" size="m" onClick={()=>setShowModal(false)}>Cancel</Button>
                <Button variant="danger" size="m" onClick={logoutside}>Logout</Button>
            </Modal.Footer>


        </Modal>

        </>
    )
}

export default Menu;