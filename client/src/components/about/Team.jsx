import React, { useEffect, useState } from 'react';
import "./Team.css";
import Avatar from 'react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'


export default function Team() {

    const [showdescadri, setShowdescadri] = useState(false);
    const [showdescjul, setShowdescjul] = useState(false);
    const [showdescmai, setShowdescmai] = useState(false);

    useEffect(() => {
        if(showdescadri){
            document.getElementById('adriscroll').scrollIntoView({behavior: 'smooth'})
        }
    },[showdescadri]) 

    useEffect(() => {
        if(showdescjul){
            document.getElementById('scrolljul').scrollIntoView({behavior: 'smooth'})
        }
    },[showdescjul]) 

    useEffect(() => {
        if(showdescmai){
            document.getElementById('scrollmai').scrollIntoView({behavior: 'smooth'})
        }
    },[showdescmai]) 


    const toggledescadri = () => {
        setShowdescadri(!showdescadri);
        setShowdescjul(false);
        setShowdescmai(false);
        
    };
    const toggledescjul = () => {
        setShowdescjul(!showdescjul);
        setShowdescadri(false);
        setShowdescmai(false);
    };
    const toggledescmai = () => {
        setShowdescmai(!showdescmai);
        setShowdescjul(false);
        setShowdescadri(false);
    };

    return (
        <>
            <div>
                <h1 className='titleaboutTT'>Get to know us!</h1>
            </div>
            <div className='personbody'>
                <div className='personcard1'>
                    <div onClick={toggledescadri}>
                        <Avatar className='pictureindivadri' src="../public/adribnw.jpg" square={true} size="397" />
                    </div>
                    <div className='personame'>
                        <h4>Adria Manday</h4>
                        <p className='perdesc'>Pixel-art Artist and Software Web Developer</p>
                    </div>
                </div>
                <div className='personcard2'>
                    <div onClick={toggledescjul}>
                        <Avatar className='pictureindivjul' src="../public/juliabnw.jpeg" square={true} size="397" />
                    </div>
                    <div className='personame'>
                        <h4>Julia Villalba</h4>
                        <p className='perdesc'>Physicist and Software Web Developer</p>
                    </div>
                </div>
                <div className='personcard3'>
                    <div onClick={toggledescmai}>
                        <Avatar className='pictureindivmai' src="../public/maibnw.jpeg" square={true} size="397" />
                    </div>
                    <div className='personame'>
                        <h4>Oumaima Essamadi</h4>
                        <p className='perdesc'>Psychologist and Software Web Developer</p>
                    </div>
                </div>
            </div>
            <div className='moreinfodiv'>
                <div className='infoadri'>
                    {showdescadri &&
                        <>
                            <div id='adriscroll'>
                                <Avatar className='pictureindivinfo' src="../public/adri.jpg" round={true} size="397" />
                                <div className='indivcontact'>
                                    <p className='contactp'>Contact Details</p>
                                    <p><a href="mailto:adriamanday@gmail.com">
                                        <span className='contacticon'><FontAwesomeIcon icon={faEnvelope} /></span>
                                        adriamanday@gmail.com
                                    </a>
                                    <div>
                                        <span><a href='https://www.linkedin.com/in/manday-adri%C3%A0/'><img className='contactli' src="../public/linkedin.png"/>/manday-adri</a></span>
                                    </div>
                                    </p>

                                </div>
                            </div>
                            <div className='descindivinfo'>
                                <div>
                                    <p>Julia is a girl’s name with Latin origins. The name Julia means “youthful” or “Jove’s child” and was once an imperial Roman name given to those born in the house of Julius Caesar. Despite its ancient roots, Julia is a modern and sophisticated yet simple name that rolls off the tongue. Lovers of literature can also find the name Julia in Shakespearean, Dickensian, and Orwellian novels.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    <div className='insideof'>
                                        <div className='insideofp'>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                                        </div>
                                        <div>
                                            <Avatar className='pictureindivinfo' src="../public/adrilogo.png" round={true} size="250" />
                                        </div>
                                    </div>
                                    <div className='insideof2'>
                                        <div>
                                            <Avatar className='pictureindivinfo rectangular-avatar' src="../public/adriart.jpg" size="150" />
                                        </div>
                                        <div>
                                            <p>Julia is a highly motivated individual who recently graduated from the University of Barcelona with a degree in Physics in 2021. Throughout her academic journey, Julia demonstrated exceptional dedication and enthusiasm towards the field of physics. She eagerly participated in various research projects, expanding her knowledge and practical skills.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div className='infoajul'>
                    {showdescjul &&
                        <>
                            <div className='descindivinfo'>
                                <p>Julia is a girl’s name with Latin origins. The name Julia means “youthful” or “Jove’s child” and was once an imperial Roman name given to those born in the house of Julius Caesar. Despite its ancient roots, Julia is a modern and sophisticated yet simple name that rolls off the tongue. Lovers of literature can also find the name Julia in Shakespearean, Dickensian, and Orwellian novels.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                <div className='insideof'>
                                    <div>
                                        <Avatar className='pictureindivinfo' src="../public/feminism.jpeg" round={true} size="280" />
                                    </div>
                                    <div className='insideofp'>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                                    </div>
                                </div>
                                <div className='insideof2'>
                                    <div>
                                        <p>Julia is a highly motivated individual who recently graduated from the University of Barcelona with a degree in Physics in 2021. Throughout her academic journey, Julia demonstrated exceptional dedication and enthusiasm towards the field of physics. She eagerly participated in various research projects, expanding her knowledge and practical skills.</p>
                                    </div>
                                    <div>
                                        <img className='unibanner' src='../public/juliauni.jpeg' />
                                    </div>
                                </div>
                            </div>
                            <div id='scrolljul'>
                                <Avatar className='pictureindivinfo' src="../public/julia.jpeg" round={true} size="397" />
                                <div className='indivcontact'>
                                    <p className='contactp'>Contact Details</p>
                                    <p><a href="mailto:julia.v_28@hotmail.com">
                                        <span className='contacticon'><FontAwesomeIcon icon={faEnvelope} /></span>
                                        julia.v_28@hotmail.com
                                    </a>
                                    <div>
                                        <span><a href='https://www.linkedin.com/in/julia-villalba-garc%C3%ADa-a37b97275/'><img className='contactli' src="../public/linkedin.png"/>/julia-villalba-garcia</a></span>
                                    </div>
                                    </p>
                                </div>
                            </div>
                        </>}
                </div>
                <div className='infaomai'>
                    {showdescmai &&
                        <>
                            <div id='scrollmai'>
                                <Avatar className='pictureindivinfo' src="../public/mai.jpeg" round={true} size="397" />
                                <div className='indivcontact'>
                                    <p className='contactp'>Contact Details</p>
                                    <p><a href="mailto:oumaimaessamadi@gmail.com">
                                        <span className='contacticon'><FontAwesomeIcon icon={faEnvelope} /></span>
                                        oumaimaessamadi@gmail.com
                                    </a>
                                    <div>
                                        <span><a href='https://www.linkedin.com/in/oumaima-essamadi/'><img className='contactli' src="../public/linkedin.png"/>/oumaima-essamadi/</a></span>
                                    </div>
                                    </p>
                                </div>
                            </div>
                            <div className='descindivinfo'>
                                <div>
                                    <p>Julia is a girl’s name with Latin origins. The name Julia means “youthful” or “Jove’s child” and was once an imperial Roman name given to those born in the house of Julius Caesar. Despite its ancient roots, Julia is a modern and sophisticated yet simple name that rolls off the tongue. Lovers of literature can also find the name Julia in Shakespearean, Dickensian, and Orwellian novels.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    <div className='insideof'>
                                        <div className='insideofp'>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                                        </div>
                                        <div>
                                            <Avatar className='pictureindivinfo' src="../public/brain.jpg" round={true} size="250" />
                                        </div>
                                    </div>
                                    <div className='insideof2'>
                                        <div>
                                            <Avatar className='pictureindivinfo rectangular-avatar' src="../public/art.png" size="150" />
                                        </div>
                                        <div>
                                            <p>Julia is a highly motivated individual who recently graduated from the University of Barcelona with a degree in Physics in 2021. Throughout her academic journey, Julia demonstrated exceptional dedication and enthusiasm towards the field of physics. She eagerly participated in various research projects, expanding her knowledge and practical skills.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>}
                </div>
            </div>
        </>
    )
}
