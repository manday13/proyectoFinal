import "./Support.css"
import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';


function Support() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [showModal, setShowModal] = useState(false);


    const skills = ([
        {
            id: 1,
            name: 'Comunication skills',
            description: 'Refers to the ability to effectively convey information, ideas, thoughts, and feelings to others in a clear and concise manner.',
            imageUrl: '/comp1.jpg',
            infor: [
                "It encompasses both verbal and non-verbal communication, including listening, speaking, writing, and interpersonal skills. ",
                "Strong communication skills are essential in the workplace as they enable individuals to collaborate, build relationships, resolve conflicts, and convey messages accurately and persuasively. ",
                "Effective communication promotes understanding, minimizes misunderstandings, enhances teamwork, and contributes to a positive and productive work environment."
            ]
        },
        {
            id: 2,
            name: 'A strong commitment to goals',
            description: 'Refers to the dedication and determination to achieve set objectives or targets. It involves demonstrating a steadfast focus, persistence, and resilience in pursuing and accomplishing desired outcomes.',
            imageUrl: '/comp2.jpg',
            infor: 'Having a strong commitment to goals means being proactive, driven, and willing to put in the necessary effort and resources to reach desired milestones. In the workplace, individuals with a strong commitment to goals are motivated and display a sense of ownership and responsibility. They set clear objectives, create actionable plans, and work diligently to achieve results. They are not easily discouraged by setbacks or challenges and are willing to adapt and adjust their strategies when needed. Their commitment to goals helps them stay focused, overcome obstacles, and maintain a high level of productivity and performance. Having a strong commitment to goals is highly valued in the workplace as it promotes accountability, perseverance, and a sense of purpose. It contributes to personal and professional growth, fosters a culture of achievement, and ultimately leads to successful outcomes and organizational success.',
        },
        {
            id: 3,
            name: 'Emotional inteligence',
            description: "Refers to the ability to recognize, understand, manage, and effectively express emotions, both in oneself and in others. It involves being aware of one's own emotions and their impact, as well as being attuned to the emotions of others and being able to empathize with them.",
            imageUrl: '/comp3.jpg',
            infor: 'Emotional intelligence encompasses several key competencies, including self-awareness, self-regulation, empathy, and social skills. In the workplace, emotional intelligence is highly valuable as it contributes to effective communication, collaboration, and relationship-building. Individuals with high emotional intelligence are able to navigate interpersonal dynamics, handle conflicts constructively, and foster a positive work environment. They are aware of their own strengths and weaknesses, manage stress effectively, and demonstrate resilience in the face of challenges. Furthermore, emotionally intelligent individuals are skilled in understanding the emotions and perspectives of their colleagues and clients. They are adept at active listening, resolving conflicts, and building rapport. They demonstrate empathy and are sensitive to the needs and feelings of others, fostering strong working relationships and promoting teamwork. Overall, emotional intelligence plays a crucial role in the workplace by enhancing individual and team performance, promoting effective leadership, and cultivating a supportive and inclusive work culture. It enables individuals to navigate complex social interactions, make sound decisions, and respond adaptively to changing circumstances.',
        },
        {
            id: 4,
            name: 'Accountability and responsability',
            description: "Accountability and responsibility is a combined concept in the workplace that emphasizes taking ownership and being answerable for one's actions, tasks, and outcomes.",
            imageUrl: '/comp4.jpg',
            infor: "In this context, accountability encompasses the willingness and ability to accept responsibility for one's actions and decisions. It involves acknowledging the impact of one's choices and actions on oneself, colleagues, and the organization as a whole. Accountable individuals understand the importance of meeting their commitments and delivering results in a timely and reliable manner. They proactively take steps to fulfill their obligations, communicate progress, and address any challenges or setbacks that may arise. Responsibility, on the other hand, relates to the duties and obligations assigned to an individual. It involves recognizing the tasks and roles one is entrusted with and taking appropriate action to fulfill them effectively. Responsible individuals understand the expectations placed upon them and strive to perform their duties conscientiously and with diligence. They demonstrate reliability, dependability, and the ability to prioritize and manage their workload effectively. When combined, accountability and responsibility form a powerful competency that drives individuals to take ownership of their work, make informed decisions, and ensure the successful completion of tasks and goals. It promotes a culture of trust, integrity, and professionalism within the workplace and contributes to overall team and organizational success.",
        },
        {
            id: 5,
            name: 'A learning mentality',
            description: 'Refers to the mindset and attitude of continuously seeking opportunities for personal and professional growth through acquiring new knowledge, developing new skills, and embracing challenges.',
            imageUrl: '/comp5.jpg',
            infor: "Having a learning mentality in the workplace involves being open to new ideas, feedback, and constructive criticism. It is about valuing continuous learning as a means to enhance performance and adapt to changing circumstances. Individuals with a learning mentality actively seek out opportunities for self-improvement, whether through formal training, informal learning experiences, or seeking guidance from mentors and colleagues. A learning mentality also includes a willingness to step outside of one's comfort zone and take on new challenges. It involves embracing failures and setbacks as learning opportunities, rather than viewing them as obstacles or sources of discouragement. Individuals with a learning mentality approach tasks and projects with a growth mindset, believing that they can acquire new skills and knowledge with effort and practice. In the workplace, a learning mentality is highly beneficial as it promotes innovation, resilience, and a culture of continuous improvement. It enables individuals to adapt to new technologies, industry trends, and evolving job requirements. Moreover, it fosters a sense of curiosity, critical thinking, and problem-solving skills, which are essential in navigating complex work environments.",
        },
    ]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                    <h1>Discover your next skills</h1>
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