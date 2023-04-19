import React, { useState } from 'react';

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

    return (
        <div>
            <br/>
            <h2>Join us today, and be part of the community!</h2>
            <p>What would you like to join as?</p>
            <button onClick={handleVolunteerClick}>Volunteer</button>
            <button onClick={handleClientChange}>Client</button>
            {registrationType === 'volunteer' && (
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
                        Role :
                        <select name="role" required>
                            <option value="">Please select a role</option>
                            <option value="artist">Community support</option>
                            <option value="tutor">Mentoring support</option>
                            <option value="therapist">Mental health support</option>
                        </select>
                    </label>
                    <button type="submit">Register as Volunteer</button>
                </form>
            )}
            {registrationType === ('client' || 'volunteer') && (
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
                    <button type="submit">Register as Participant</button>
                </form>
            )}
        </div>
    );
}

export default RegistrationForm;
