import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-scroll';
import { faChevronDown, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'


function Home() {
    return (
        <>
            <div className='one'>
                <h1>For women, by women ...</h1>
                <p style={{marginBottom: "100px", fontSize:"large", color:"rgb(254,226,203)"}}>We support women who have been incarcerated, offering them psychological support through therapy and workshops. We also provide guidance on reintegration into the workforce, helping women to rebuild their lives and achieve their goals.</p>
                <p><b>You want to know more about us, right?</b></p>                
                <a style={{height: "50px", paddingTop: "10px"}} href="#inicio"><FontAwesomeIcon style={{fontSize:"20px"}} icon={faChevronDown} /></a>
            </div>
            <div className='rows' id="inicio">
                <div className='row1'>
                    <div className='col1'>
                        <img src="../public/image1.jpeg" />
                    </div>
                    <div className='col2'>
                        <h1>Our mission</h1>
                        <p>Our mission is to empower and support women who have been released from prison to successfully reintegrate into society</p>
                        <a href="/about/Mission"><button className='homebutton'>Read more</button></a>
                    </div>
                </div>
                <div className='row2'>
                    <div className='col1'>
                        <h1>Our support</h1>
                        <p>Our personal touch is that in our workshops you can work different competencies. Moreover, we provide the figure of a tutor that can write for our clients a recommendation letter related to the competencies that have been achieved in the workshops.</p>
                        <a href="/about/Support"><button className='homebutton'>Read more</button></a>
                    </div>
                    <div className='col2'>
                        <img src="../public/image3.jpeg" />
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
                        <a href="/Register"><button className='homebutton'>Read more</button></a>
                    </div>
                </div>
            </div>
            <div className="about">
                <h1>Testimonies</h1>
                <div className="testimon">
                     <FontAwesomeIcon icon={faQuoteLeft} className="testicon"/>
                    <p>After being out of the workforce for several years due to personal reasons, I felt like I was starting from scratch. But thanks to this amazing website, I was able to find job openings that matched my skills and interests. The website's resources helped me build a strong resume and cover letter, and I received guidance on how to prepare for interviews.</p>
                    <FontAwesomeIcon icon={faQuoteRight} className="testicon" />
                </div>
                <p><i>-User of Womenoutprison</i></p>
                
                
            </div>
        </>
    )
}

export default Home;