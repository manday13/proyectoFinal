import "./Support.css"
import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';


function Support() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [showModal, setShowModal] = useState(false);


    const skills = ([
        {
            id: 1,
            name: 'Trabajo en equipo y cooperación',
            description: 'Trabajo en equipo y cooperación implica la intención de colaborar y cooperar con los demás, formar parte de un grupo, trabajar juntos, en comparación a trabajar individualmente o competitivamente. Para que esta competencia sea efectiva, la intención tiene que ser sincera. ',
            imageUrl: 'https://placekitten.com/300/300',
            infor: [
                "Tiene una actitud positiva para colaborar con los demás.",
                "Mantiene buenas relaciones con los compañeros/as.",
                "Ayuda cuando se lo piden.",
                "Coopera con actitud positiva en equipos y apoya las decisiones de éstos. Es un 'buen jugador del equipo'.",
                "Mantiene a los otros miembros informados de los temas que les afectan (procesos, sucesos, acciones individuales, etc.).",
                "Se coordina con los compañeros para alcanzar el objetivo común del equipo.",
                "Escucha los compañeros/as, y valora sinceramente sus ideas y experiencia, para aprender de ellos/as.",
                "Habla bien de los otros miembros del grupo, y expresa expectativas positivas con respecto a sus habilidades, aportaciones, etc.",
                "Fomenta y promueve la colaboración.",
                "Anima y motiva a los demás, y les hace sentir fuertes e importantes.",
                "Fomenta la participación y aportación de ideas de todos los miembros del equipo.",
                "Reconoce públicamente los méritos de los miembros del grupo que han trabajado bien.",
                "Realiza acciones para desarrollar un ambiente de trabajo amistoso, un buen clima y espíritu de cooperación (celebra reuniones y crea símbolos de identidad en el grupo).",
                "Resuelve los conflictos que puedan producirse dentro del equipo.",
                "Defiende la identidad y buena reputación del grupo frente a terceros.",
                "Fomenta y promueve la cooperación entre distintos equipos de trabajo."
            ]
        },
        {
            id: 2,
            name: 'Autoconfianza',
            description: 'Autoconfianza es el convencimiento de que uno es capaz de realizar con éxito una tarea o escoger el enfoque adecuado para realizar un trabajo o resolver un problema. Incluye mostrar confianza en las propias capacidades, decisiones y opiniones.',
            imageUrl: 'https://placekitten.com/300/300',
            infor: '',
        },
        {
            id: 3,
            name: 'Comunicacion',
            description: 'Comunicación es la habilidad de transmitir, de explicar algo a alguien de forma clara y comprensible. Incluye desde la transmisión de información hasta la relación de ideas, intereses, etc. La comunicación puede ser oral y/o escrita y se dirige a públicos distintos.',
            imageUrl: 'https://placekitten.com/300/300',
            infor: '',
        },
        {
            id: 4,
            name: 'Empatía',
            description: 'Empatía implica saber entender a los demás. Es la habilidad para escuchar, entender correctamente los pensamientos, sentimientos o preocupaciones de los demás a pesar de que éstos no se expresen verbalmente o se expresen parcialmente. Esta competencia mide la creciente complejidad y profundidad que supone entender a los demás.',
            imageUrl: 'https://placekitten.com/300/300',
            infor: '',
        },
        {
            id: 5,
            name: 'Autocontrol',
            description: 'Autocontrol es la capacidad de mantener las propias emociones bajo control y evitar reacciones negativas ante provocaciones, oposición u hostilidad por parte de otros o cuando se trabaja en condiciones de estrés. Igualmente, implica la resistencia en condiciones constantes de estrés.',
            imageUrl: 'https://placekitten.com/300/300',
            infor: '',
        },
    ]);

    const handleSelect = (selectedIndex) => {
        setActiveIndex(selectedIndex);
    };

    const handleSkillchange = (selectedIndex) => {
        setSelectedSkill(skills[selectedIndex]);
        setShowModal(true);
    };


    const skillItems = skills.map((skill) => (
        <Carousel.Item key={skill.id}>
            <div className="leftright">
                <div className="left-side">
                    <img src={skill.imageUrl} alt={skill.name} />
                </div>
                <div className="right-side">
                    <h3 onClick={() => handleSkillchange(skill.id - 1)}>{skill.name}</h3>
                    <h6>{skill.description}</h6>
                </div>
            </div>
            <br />
            <br />
            <br />
        </Carousel.Item>
    ));

    return (

        <div className="fondoSup">
            <h1 className='titleAboutS'>Our Support</h1>
            <div className='infoAbout'>
                <p>The role of a tutor in the organization where formerly incarcerated women participate in workshops to develop specific skills involves providing guidance and support to these women throughout their training. The tutor's primary responsibility is to help these women acquire the skills they need to succeed in their chosen field, whether it is through providing individualized coaching or facilitating group learning activities.

                    In addition, the tutor is responsible for assessing the progress of the participants and creating reports that highlight their strengths and areas for improvement. These reports can be used by the women as recommendations when seeking employment or applying for further training opportunities.

                    Overall, the tutor plays a crucial role in helping formerly incarcerated women develop their skills, gain confidence, and successfully transition into the workforce..</p>
                <p>Among all the different skills that we think that are needed at work, we have selected which we think that are essencial to have. If you achieve all of these skills, we will give you a verification that you have worked and succeed all the essential skills to be prepared to work. These skills are: </p>
            </div>
            <div className="cardholder">
                <div className="overallcard">
                    <h1 className="overallcard">Discover your next skills</h1>
                </div>
                <div className="divCaru">
                    {/* <br /> */}
                    <Carousel activeIndex={activeIndex} onSelect={handleSelect}>
                        {skillItems}
                    </Carousel>
                </div>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedSkill?.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{selectedSkill?.infor}</Modal.Body>
                </Modal>
            </div>
        </div>

    )

}

export default Support;