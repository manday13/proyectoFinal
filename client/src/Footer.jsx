
import "./Footer.css"
import {Row, Col} from "react-bootstrap"

function Footer() {
    return (
        <>
        <div className="footer">
        
            <Row>
                <Col className="col-4"><p>Follow us</p></Col>
                <Col className="col-4">
            <h4>Women's health and reinsertion</h4>  
            </Col>
            <Col className="col-4"><p>Newsletter</p></Col>
            </Row>
            
            <p style={{fontSize: "small", textAlign: "center", paddingTop: "10px"}}>Copyright 2023 © All rights Reserved.</p>
        </div>
        
        </>
    )
}

export default Footer;