import './about.css'
import './Mission.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

function Mission() {
    
    return (
        <>
            <h1 className='titleAboutM'>Our Mission</h1>
            <div style={{ marginBottom: "35px" }} className='infoAbout'>
                <p>At ||Website Name||, our mission is to empower and support women who have been released from prison to successfully reintegrate into society. We believe that every woman deserves a second chance and that by providing free workshops and therapy/mental health services, we can help them overcome challenges, build essential life skills, and thrive in their communities. Our goal is to break down barriers, reduce recidivism rates, and promote positive change in the lives of formerly incarcerated women, creating a brighter future for them and their families.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisic. Rerum fuga corporis non veritatis tempore recusandae maiores quasi quis tenetur delectus, magnam atque aut rem! Deleniti non debitis nemo hic repellat. Enim dicta aliquam, corrupti rem nostrum maiores neque nam ducimus quae hic voluptatibus aperiam libero esse obcaecati dignissimos deleniti veniam atque expedita officiis! Beatae, cum eius odit non nam maxime iste corrupti fuga dicta sint debitis voluptas voluptatem aut neque! Quod porro nobis voluptatem labore dicta accusamus eveniet qui fugit cum commodi, minus deserunt debitis esse velit soluta quas facilis quia! Ab iste facilis est excepturi quas inventore. Sequi, ipsum quis! Id pariatur odit doloremque nulla at, perferendis dolor itaque.</p>
                <p>We offer different workshops and group therapies done by volunteers in order to evolve your mental health and give you some distraction for the daily life. If you want to see the different events that are available at the moment, please click here to have more information:</p>
                <br />

                {/* <div><img className="trans" width="100px" src="../public/arrow.png" /><a href="/services"><button className="servicesbutton">Discover our available events</button></a><FontAwesomeIcon className="minus1"  icon={faMinus} /><FontAwesomeIcon className="minus2"  icon={faMinus} /><FontAwesomeIcon className="minus3"  icon={faMinus} /></div> */}

            </div>
            <div className='divShot'>
                <a href="/services"><h5>Click in here to see more</h5></a>
                <a href="/services"><img className='screenshot' src="/captura-services3.png" alt="services page" /></a>
            </div>

        </>
    )
}

export default Mission;