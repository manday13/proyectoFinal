import React, { useState } from 'react';
import './Register.css'

function RegistrationForm() {
    const [registrationType, setRegistrationType] = useState('');
    const [pronouns, setPronouns] = useState('');
    const [criminal, setCriminal] = useState('');

    const handleVolunteerClick = () => {
        setRegistrationType('volunteer');
    };

    const handleClientChange = () => {
        setRegistrationType('client');
    };

    const handlePronounsChange = (event) => {
        setPronouns(event.target.value);
    };

    const handleCriminalChange = (event) => {
        setCriminal(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission here
    };

    function Collapsible({ title, content }) {
        const [isOpen, setIsOpen] = useState(false);

        const handleToggle = () => {
            setIsOpen(!isOpen);
        };
        return (
            <div>
                <h5 onClick={handleToggle}>
                    {title}
                    <span className='symbol'>{isOpen ? '-' : '+'}</span>
                </h5>
                {isOpen && <div>{content}</div>}

            </div>
        );
    }

    return (
        <div>
            <h3 className="titleAboutR">Join us today, and be part of the community!</h3>
            <div className='parag'>
                <p>
                    Welcome to our community! We are dedicated to providing women who have been incarcerated with the resources and support they need to successfully reintegrate into society. Our services are designed to empower, inspire and encourage personal growth, while providing practical assistance for a smooth transition back into the community. Whether you're looking for job training, counseling, education or just a supportive network of individuals who understand your journey, we're here for you. Join us today and let us help you take the next step in your journey towards a brighter future. Together, we can break down barriers and create a more just and equitable society for all.
                </p>
            </div>
            <div className='firstpart'>
                <hr />
                <div className='collapsible-div'>
                    <Collapsible title="Your role as a client" content="Welcome to our client community, a safe and supportive space exclusively designed for women who have recently been released from incarceration. As a client, you'll have access to a wide range of services, including group therapy sessions and interactive workshops such as art sessions and many more, all aimed at fostering personal growth and facilitating a successful reintegration into society. Our client portal makes it easy for you to sign up, browse, and participate in the workshops that interest you the most. So don't hesitate, take the first step towards a brighter future and join our client community today."></Collapsible>
                </div>
                <hr />

                <div className='collapsible-div'>
                    <Collapsible
                        title="Your role as a volunteer"
                        content={
                            <>
                                <p>Join our volunteer portal, a dynamic community of dedicated individuals committed to making a positive impact in the lives of women who have been incarcerated. As a volunteer, you'll have the opportunity to share your skills, knowledge, and experience with our clients, helping them develop new skills and discover new passions. There are three types of volunteering services available:</p>
                                <ul>
                                    <li><b>Community support:</b> You will be responsible for organizing and hosting workshops</li>
                                    <li><b>Mentoring support:</b> Tutors. to find out more about the role of a tutor, check <a href='./about/Support'>Our Support</a> section</li>
                                    <li><b>Mental health support:</b> You will be responsible for organizing and hosting group and/or individual thepary session, and other mental health services</li>
                                </ul>
                            </>
                        }
                    />
                </div>
                <hr />
                <div className='joinquestion'>
                    <br />
                    <br />
                    <h5>What would you like to join as?</h5>
                    <br />
                    <span> <a href="#button1">
                        <button id="button1"
                            type='choice1' style={{ backgroundColor: (registrationType === "volunteer") ? "#b79957" : "#f5d389" }}
                            onClick={handleVolunteerClick}
                        >
                            Volunteer
                        </button></a>
                        <a href="#button2">
                            <button id="button2" type='choice' style={{ backgroundColor: (registrationType === "client") ? "#b79957" : "#f5d389" }}
                                onClick={handleClientChange}>Client</button></a>
                        <br />
                        <br/>
                        <p>Already have an account? <a href='./Sign'>Log in</a></p>
                        <br />
                        <br />
                    </span>
                </div>
            </div>
            {registrationType === 'volunteer' && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Full Name :
                        <input type="text" required />
                    </label>
                    <label>
                        Email :
                        <input type="email" required />
                    </label>
                    <label>
                        Create Password :
                        <input type="password" required />
                    </label>
                    <label>
                        Phone number (optional) :
                        <br />
                        +34
                        <input type="tel" maxlength="9" />
                    </label>
                    <label>
                        Pronouns :
                        <select value={pronouns} onChange={handlePronounsChange} required>
                            <option value="empty"></option>
                            <option value="sheher">She/Her</option>
                            <option value="theythem">They/Them</option>
                            <option value="novalue">Prefer not to say</option>
                        </select>
                    </label>
                    <label>
                        Role :
                        <select required>
                            <option value="">Please select a role</option>
                            <option value="artist">Community support</option>
                            <option value="tutor">Mentoring support</option>
                            <option value="therapist">Mental health support</option>
                        </select>
                    </label>
                    <br />
                    <button type="submit">Register as Volunteer</button>
                    <br />
                    <br />
                </form>
            )}
            {registrationType === 'client' && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Full Name :
                        <input type="text" name="name" required />
                    </label>
                    <label>
                        Email :
                        <input type="email" name="email" required />
                    </label>
                    <label>
                        Create Password :
                        <input type="password" name="password" required />
                    </label>
                    <label>
                        Phone number (optional) :
                        <br />
                        +34
                        <input type="tel" name="phone" maxlength="9" />
                    </label>
                    <label>
                        Pronouns :
                        <select value={pronouns} onChange={handlePronounsChange} required>
                            <option value="empty"></option>
                            <option value="sheher">She/Her</option>
                            <option value="theythem">They/Them</option>
                            <option value="novalue">Prefer not to say</option>
                        </select>
                    </label>
                    <label>
                        Criminal record :
                        <input type="text" name="record" required />
                    </label>
                    <br />
                    <button type="submit">Register as Participant</button>
                    <br />
                    <br />
                </form>
            )}
        </div>
    );
}

export default RegistrationForm;
