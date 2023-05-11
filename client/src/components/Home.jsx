import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GlobalContext from '../GlobalContext.js'
import { useContext } from "react";
import { Link } from 'react-router-dom';
import { faChevronDown, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col } from 'react-bootstrap';


function Home() {
    return (
        <>
            <div className='one'>
                <h1>For women, by women ...</h1>
                <p style={{ marginBottom: "100px", fontSize: "large", color: "rgb(254,226,203)" }}>We support women who have been incarcerated, offering them psychological support through therapy and workshops. We also provide guidance on reintegration into the workforce, helping women to rebuild their lives and achieve their goals.</p>
                <p><b>You want to know more about us, right?</b></p>
                <a className='flechitapabajo' style={{ height: "50px", paddingTop: "10px" }} href="#inicio"><FontAwesomeIcon style={{ fontSize: "20px" }} icon={faChevronDown} /></a>
            </div>
            <div className='rows' id="inicio">
                <div className='row1'>
                    <div className='col1'>
                        <img src="../public/image1.jpeg" />
                    </div>
                    <div className='col2'>
                        <h1>Our mission</h1>
                        <p>Our mission is to empower and support women who have been released from prison to successfully reintegrate into society</p>
                        <Link to="/about/Mission"><button className='homebutton'>Read more</button></Link>
                    </div>
                </div>
                <div className='row2'>
                    <div className='col2'>
                        <img src="../public/image3.jpeg" />
                    </div>
                    <div className='col1'>
                        <h1>Our support</h1>
                        <p>Our personal touch is that in our workshops you can work different competencies. Moreover, we provide the figure of a tutor that can write for our clients a recommendation letter related to the competencies that have been achieved in the workshops.</p>
                        <Link to="/about/Support"><button className='homebutton'>Read more</button></Link>
                    </div>
                </div>
                <div className='row3'>
                    <div className='col1'>
                        <div className="imagehov"></div>
                        <img src="../public/image2.jpg" />
                    </div>
                    <div className='col2'>
                        <h1>Join Us </h1>
                        <p>Be part of the good change, and sign up/ volunteer</p>
                        <Link to="/Register"><button className='homebutton'>Read more</button></Link>
                    </div>
                </div>
            </div>
            <div className="about">
                <h1>Testimonies</h1>
                <div className="testimon">
                    <FontAwesomeIcon icon={faQuoteLeft} className="testicon" />
                    <p>After being out of the workforce for several years due to personal reasons, I felt like I was starting from scratch. But thanks to this amazing website, I was able to find job openings that matched my skills and interests. The website's resources helped me build a strong resume and cover letter, and I received guidance on how to prepare for interviews.</p>
                    <FontAwesomeIcon icon={faQuoteRight} className="testicon" />
                </div>
                <p><i>-User of Womenoutprison</i></p>
                <br />
                <br />

            </div>
            {/* <Container className='rows' id="inicio">
                <Row className='one'>
                    <div className='one'>
                        <h1>For women, by women ...</h1>
                        <p style={{ marginBottom: "100px", fontSize: "large", color: "rgb(254,226,203)" }}>We support women who have been incarcerated, offering them psychological support through therapy and workshops. We also provide guidance on reintegration into the workforce, helping women to rebuild their lives and achieve their goals.</p>
                        <p><b>You want to know more about us, right?</b></p>
                        <a className='flechitapabajo' style={{ height: "50px", paddingTop: "10px" }} href="#inicio"><FontAwesomeIcon style={{ fontSize: "20px" }} icon={faChevronDown} /></a>
                    </div>
                </Row>
                <Row className='row1'>
                    <Col className='col1'>
                        <img src="../public/image1.jpeg" />
                    </Col>
                    <Col className='col2'>
                        <h1>Our mission</h1>
                        <p>Our mission is to empower and support women who have been released from prison to successfully reintegrate into society</p>
                        <Link to="/about/Mission"><button className='homebutton'>Read more</button></Link>
                    </Col>
                </Row>
                <Row className='row2'>
                    <Col className='col1'>
                        <h1>Our support</h1>
                        <p>Our personal touch is that in our workshops you can work different competencies. Moreover, we provide the figure of a tutor that can write for our clients a recommendation letter related to the competencies that have been achieved in the workshops.</p>
                        <Link to="/about/Support"><button className='homebutton'>Read more</button></Link>
                    </Col>
                    <Col className='col2'>
                        <img src="../public/image3.jpeg" />
                    </Col>
                </Row>
                <Row className='row3'>
                    <Col className='col1'>
                        <div className="imagehov"></div>
                        <img src="../public/image2.jpg" />
                    </Col>
                    <Col className='col2'>
                        <h1>Join Us </h1>
                        <p>Be part of the good change, and sign up/ volunteer</p>
                        <Link to="/Register"><button className='homebutton'>Read more</button></Link>
                    </Col>
                </Row>
                <Row className='about'>
                    <Col>
                        <h1>Testimonies</h1>
                        <div className="testimon">
                            <FontAwesomeIcon icon={faQuoteLeft} className="testicon" />
                            <p>After being out of the workforce for several years due to personal reasons, I felt like I was starting from scratch. But thanks to this amazing website, I was able to find job openings that matched my skills and interests. The website's resources helped me build a strong resume and cover letter, and I received guidance on how to prepare for interviews.</p>
                            <FontAwesomeIcon icon={faQuoteRight} className="testicon" />
                        </div>
                        <p><i>-User of Womenoutprison</i></p>
                    </Col>
                </Row>
            </Container> */}
        </>
    )
}

export default Home;