import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GlobalContext from '../GlobalContext';
import API_URL from '../apiconfig';
import './Register.css'

function RegistrationForm() {
    const goTo = useNavigate();
    const [registrationType, setRegistrationType] = useState('');
    const [pronouns, setPronouns] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const { role, setRole } = useContext(GlobalContext);
    const [record, setRecord] = useState('');
    const [errorPass, setErrorPass] = useState('');

    console.log(registrationType)// chivatos abandonas de la mano de Dios
    useEffect(() => {
        if (role === "2") {
            setRegistrationType("tutor");
        } else if ((role === '1') || (role === '3')) { setRegistrationType('volunteers') }
    }, [role])

    useEffect(() => {
        if (password !== confirmPassword) {
            setErrorPass(true);
        }
        if (password === confirmPassword) {
            setErrorPass(false);
        }
    }, [password, confirmPassword])

    const handleVolunteerClick = () => {
        setRegistrationType('volunteers');
    };

    const handleClientChange = () => {
        setRegistrationType('users');
    };

    const handlePronounsChange = (event) => {
        setPronouns(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission here
        const ob = {
            name,
            email,
            password,
            phone,
            pronouns,
        }
        if (registrationType === "volunteers") {
            ob.role = role;
        } else if (registrationType === "users") {
            ob.record = record;
            ob.id_t = 1; //se podria cambiar para que no sea estatico sino que vaya asignando un tutor en funcion de si otro tutor ya tiene muchos users asociados
        }
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ob)
        };
        fetch(API_URL + registrationType, options)
        goTo('/') //redirigimos a home
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
                            type='choice1' style={{ backgroundColor: ((registrationType === 'volunteers') || (registrationType === 'tutor')) ? "#b79957" : "#f5d389" }}
                            onClick={handleVolunteerClick}
                        >
                            Volunteer
                        </button></a>
                        <a href="#button2">
                            <button id="button2" type='choice' style={{ backgroundColor: (registrationType === 'users') ? "#b79957" : "#f5d389" }}
                                onClick={handleClientChange}>Client</button></a>
                        <br />
                        <br />

                        <p>Already have an account? <Link to='/Signselect'>Log in</Link></p>

                    </span>
                </div>
            </div>
            {(registrationType === 'volunteers') || (registrationType === 'tutor') ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Full name :
                        <input type="text" onInput={(e) => setName(e.target.value)} required />
                    </label>
                    <label>
                        Email :
                        <input type="email" onInput={(e) => setEmail(e.target.value)} required />
                    </label>
                    <label>
                        Create password :
                        <input type="password" onInput={(e) => setPassword(e.target.value)} required />
                    </label>
                    <label>
                        Repeat the password :
                        {errorPass ?
                        <>
                            <b className='passEr'>     Password is not the same</b>
                        </>
                        :
                        <></>}
                        <input type="password" name="confirmPassword" onInput={(e) => setConfirmPassword(e.target.value)} required />
                    </label>
                    <label>
                        Phone number (optional) :
                        <br />
                        <input type="tel" maxLength="9" onInput={(e) => setPhone(e.target.value)} />
                    </label>
                    <label>
                        Pronouns :
                        <select value={pronouns} onChange={handlePronounsChange} required>
                            <option value="0"></option>
                            <option value="1">She/Her</option>
                            <option value="2">They/Them</option>
                            <option value="3">Prefer not to say</option>
                        </select>
                    </label>
                    <label>
                        Role :
                        <select required onChange={(e) => setRole(e.target.value)}>
                            <option value="0">Please select a role</option>
                            <option value="1">Community support</option>
                            <option value="2">Mentoring support</option>
                            <option value="3">Mental health support</option>
                        </select>
                    </label>
                    <br />
                    <button type="submit" className='register-button'>Register as Volunteer</button>
                    <br />
                    <br />
                </form>
            ) : <></>}
            {registrationType === 'users' && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Full name :
                        <input type="text" name="name" onInput={(e) => setName(e.target.value)} required />
                    </label>
                    <label>
                        Email :
                        <input type="email" name="email" onInput={(e) => setEmail(e.target.value)} required />
                    </label>
                    <label>
                        Create password :
                        <input type="password" name="password" onInput={(e) => setPassword(e.target.value)} required />
                    </label>
                    <label>
                        Repeat the password :
                        {errorPass ?
                        <>
                            <b className='passEr'>     Password is not the same</b>
                        </>
                        :
                        <></>}
                        <input type="password" name="confirmPassword" onInput={(e) => setConfirmPassword(e.target.value)} required />
                    </label>
                    <label>
                        Phone number (optional) :
                        <br />
                        <input type="tel" name="phone" maxLength="9" onInput={(e) => setPhone(e.target.value)} />
                    </label>
                    <label>
                        Pronouns :
                        <select value={pronouns} onChange={handlePronounsChange} required>
                            <option value="0"></option>
                            <option value="1">She/Her</option>
                            <option value="2">They/Them</option>
                            <option value="3">Prefer not to say</option>
                        </select>
                    </label>
                    <label>
                        Criminal record :
                        <input type="text" name="record" onInput={(e) => setRecord(e.target.value)} required />
                    </label>
                    <br />
                    <button type="submit" className='register-button'>Register as Participant</button>
                    <br />
                    <br />
                </form>
            )}
        </div>
    );
}

export default RegistrationForm;
