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
                                    <p>My name is Adrià Manday, and I have a deep passion for Chinese martial arts, drawing, comics, and programming. I find immense joy in practicing Kung Fu, not only for its health benefits but also for the self-discipline it instills in me. Since childhood, I have been captivated by the world of drawing and comics, and I continue to nurture this artistic interest. Additionally, I have a strong affinity for everything related to computer science, especially web development and experimenting artistically with video games.</p>
                                    <div className='insideof'>
                                        <div className='insideofp'>
                                            <p>My journey in Chinese martial arts has been a significant part of my life. Through Kung Fu, I have learned invaluable lessons about physical and mental well-being, enhancing my overall health and discipline. The practice has not only shaped me as an individual but also taught me the importance of focus, perseverance, and self-improvement. It is an ongoing journey that continues to inspire me both on and off the training mat.</p>
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
                                            <p>In addition to my martial arts practice, I have cultivated a deep love for drawing and comics. From a young age, I have been immersed in the art form, exploring various styles and techniques. The ability to create visually compelling stories and characters brings me great fulfillment. Furthermore, my passion for technology and programming has led me to delve into web development and experimenting with the artistic aspects of video games. The blend of creativity and technical expertise fuels my curiosity, and I constantly seek opportunities to challenge myself in these fields.</p>
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
                                <p>My name is Julia, and I am passionate about traveling and discovering new places. Exploring different cultures and experiencing adventures has always been a source of joy for me. Additionally, I value the importance of spending quality time with the people who are dear to me. Alongside my love for exploration, I have nurtured a strong affinity for the sciences since my childhood. I am particularly inclined towards numbers and find great satisfaction in solving complex problems that demand mental agility and analytical thinking.</p>
                                <div className='insideof'>
                                    <div>
                                        <Avatar className='pictureindivinfo' src="../public/feminism.jpeg" round={true} size="280" />
                                    </div>
                                    <div className='insideofp'>
                                        <p>During my adolescence, I began to delve into political matters, becoming increasingly aware of the various injustices and oppressions prevalent in my environment. I developed a particular focus on gender-related issues and the profound inequalities and injustices endured by women, not only within my immediate surroundings but also on a global scale. This awareness has fueled my dedication and commitment to promoting gender equality and seeking justice for women. I strive to make a positive impact by challenging societal norms and advocating for equal opportunities.</p>
                                    </div>
                                </div>
                                <div className='insideof2'>
                                    <div>
                                        <p>After completing my undergraduate degree in Physics with a specialization in applied physics, I found myself at a crossroads, contemplating various career paths. Taking into account my programming background and my natural inclination for problem-solving, I made the decision to further pursue my studies in this field. The combination of my passion for solving intricate problems, the challenges presented by programming, and the opportunity for in-depth analysis made it an appealing choice. By immersing myself in the world of programming, I aim to refine my skills and contribute to innovative solutions that address complex challenges.</p>
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
                                    <p>I am Oumaima, a lifelong learner with a passion for exploring the intricacies of the human mind and the world around us. With a background in psychology, programming, and engineering, I like to bring a blend of analytical thinking and creative problem-solving to everything I do. When I'm not immersed in academia, I find joy in the realms of literature and art, losing myself in captivating stories and expressing my creativity through painting. Nature serves as my sanctuary, where I take leisurely walks and find inspiration in its awe-inspiring beauty. Deep thinking fuels my curiosity, propelling me to unravel complex ideas and seek innovative solutions. I'm constantly seeking opportunities to expand my knowledge and love learning new things, embarking on exciting journeys of discovery.</p>
                                    <div className='insideof'>
                                        <div className='insideofp'>
                                            <p>I am also a passionate advocate for mental health and mental wellness. Recognizing the importance of emotional well-being in our lives, I am dedicated to spreading awareness and promoting positive mental health practices. Through my experiences in psychology, I have gained valuable insights into the complexities of the human mind and the challenges we face. With empathy and compassion, I strive to create a supportive and inclusive environment where individuals can openly discuss their mental health concerns and seek the help they need. I believe in the power of destigmatizing mental health issues and fostering a culture of self-care and resilience.</p>
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
                                            <p>Art in all its forms serves as a profound source of inspiration for me, igniting my creative spirit and nurturing my artistic soul. Whether it's admiring masterpieces in museums, delving into the pages of a thought-provoking novel, or expressing myself through painting, art captivates me on a deep level. The power of colors, shapes, and textures to evoke emotions and convey messages fascinates me, and I find solace and joy in the process of creation. Art fuels my imagination, allowing me to see the world through a different lens and inspiring me to explore new possibilities. It is through art that I find a profound sense of self-expression, liberation, and fulfillment, and I am grateful for the endless inspiration it provides me on my journey of self-discovery and growth.</p>
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
