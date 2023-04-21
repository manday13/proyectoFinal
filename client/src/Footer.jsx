
import "./Footer.css"
import {Row, Col, Form, FormGroup, Button, Container} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

function Footer() {
    return (
        <Container className="footer" fluid>
        
        
            <Row>
                <Col className="col-12 col-sm-4"><p className="center ">CONTACT US</p><p className="center  contacthelp"><a href="mailto:help@womenprison.com"><FontAwesomeIcon style={{marginRight:"5px"}} icon={faEnvelope} />help@womenprison.com</a></p></Col>
                <Col className="col-12 col-sm-4">
            <h4 className="center"><b>WOMEN'S HEALTH AND REINSERTION</b></h4> 
            <p className="center">"For women, by women..."</p> 
            </Col>
            <Col className="col-12 col-sm-4">
                <p className="center ">NEWSLETTER</p>
                <Form>                
                    <FormGroup>
                        <Form.Control className="formin" type="email" placeholder="Email"/>
                    </FormGroup>
                </Form>
                <br />
                <div className="formsend"><button className="bsend"  type="submit">Submit</button></div>
            
            </Col>
            </Row>
            <br />
            <br/>
            <hr />
            <p className="center small margincopy">Copyright 2023 © All rights Reserved.</p>
            <div className="frrss">
                <a href="https://www.instagram.com/" target="_blank"><button className="rrss">i</button></a>
                <a href="https://es-es.facebook.com/" target="_blank"><button className="rrss">f</button></a>
                <a href="https://twitter.com/?lang=es " target="_blank"><button className="rrss">t</button></a>
            </div>
      
        
        </Container>
    )
}

export default Footer;