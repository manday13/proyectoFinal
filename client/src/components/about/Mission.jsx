import './about.css'
import './Mission.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


function Mission() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <h1 className='titleAboutM'>Our Mission</h1>
            <div style={{ marginBottom: "35px" }} className='infoAbout'>
                <p>At Woop, Women Out of Prison, our mission is to empower and support incarcerated women in their journey towards successful reintegration into society. We believe that every woman deserves a second chance and that by providing them with the necessary resources and support, we can help break the cycle of recidivism. Through our website, we strive to create a safe and inclusive online community that offers educational resources, job placement assistance, and emotional support to women who have experienced incarceration.</p>
                <p>Our primary goal is to address the unique challenges faced by women upon their release from prison. We understand that these women often face barriers such as limited access to employment opportunities, housing instability, and societal stigma. Woop aims to bridge these gaps by partnering with organizations, employers, and mentors who are dedicated to the successful reintegration of formerly incarcerated women. By connecting these women with meaningful employment, safe housing options, and supportive networks, we aim to break down the barriers that hinder their successful reentry into society.</p>
                <p>We offer different workshops and group therapies done by volunteers in order to evolve your mental health and give you some distraction for the daily life. If you want to see the different events that are available at the moment, please click here to have more information:</p>
                <br />

                {/* <div><img className="trans" width="100px" src="../public/arrow.png" /><a href="/services"><button className="servicesbutton">Discover our available events</button></a><FontAwesomeIcon className="minus1"  icon={faMinus} /><FontAwesomeIcon className="minus2"  icon={faMinus} /><FontAwesomeIcon className="minus3"  icon={faMinus} /></div> */}

            </div>
            <div className='divShot'>
                <Link to="/services"><h5>Click in here to see more</h5></Link>
                <Link to="/services"><img className='screenshot' src="/captura-services3.png" alt="services page" /></Link>
            </div>

        </>
    )
}

export default Mission;