import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import GlobalContext from './GlobalContext.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './Menu.css'

function Menu() {
    const {username, logout} = useContext(GlobalContext)

    if(!username){
        return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Link to="/" className="linklogo"><Navbar.Brand >LOGO</Navbar.Brand></Link>
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
        <Navbar bg="light" expand="lg">
            <Container>
            <Link to="/" className="linklogo"><Navbar.Brand >LOGO</Navbar.Brand></Link>
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
                    <NavDropdown drop='down-centered' title={<FontAwesomeIcon icon={faUser}/>} >              
                        <NavDropdown.Item href="#action/3.1"><Link to="/perfil" className="linklogo nav-link">Personal information</Link></NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.1">Ahievements</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.1">Log Out</NavDropdown.Item>                        
                    </NavDropdown>  
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Menu;