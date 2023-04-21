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
                    <span>{isOpen ? '-' : '+'}</span>
                </h5>
                {isOpen && <div>{content}</div>}
                <hr/>
            </div>
        );
    }

    return (
        <div>
            <div className='firstpart'>
                <br />
                <br />
                <h3>Join us today, and be part of the community!</h3>
                <br />
                <hr />
                <div>
                    <Collapsible title="Your role as a client" content = "this is the contenhhhhhhhhhhhhhhhhhhhht of the clienthis is the contenhhhhhhhhhhhhhhhhhhhht of the clienthis is the contenhhhhhhhhhhhhhhhhhhhht of the clienthis is the contenhhhhhhhhhhhhhhhhhhhht of the clienthis is the contenhhhhhhhhhhhhhhhhhhhht of the client"></Collapsible>
                    <Collapsible title="Your role as a volunteer" content = "this is the cotent"></Collapsible>
                </div>
                <hr />
                <br />
                <h5>What would you like to join as?</h5>
                <br />
                <span>
                    <button
                        type='choice1'
                        onClick={handleVolunteerClick}
                    >
                        Volunteer
                    </button>
                    <button type='choice' onClick={handleClientChange}>Client</button>
                </span>
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
                        <select value={criminal} onChange={handleCriminalChange} required>
                            <option value="empty"></option>
                            <option value="0">Yes</option>
                            <option value="1">No</option>
                        </select>
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
