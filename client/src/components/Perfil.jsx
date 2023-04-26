import { useContext, useEffect, useState } from 'react';
import GlobalContext from "../GlobalContext";
import API_URL from '../apiconfig';
import './Perfil.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


function Perfil() {
    const { id, setToken, token, type } = useContext(GlobalContext);
    const [refresh, setRefresh] = useState(true);
    const [error, setError] = useState('');
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);
    const [imagen, setImagen] = useState();
    const [nombre, setNombre] = useState();
    const [email, setEmail] = useState();

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', authorization: token }
        };
        if (refresh) {
            fetch(API_URL + type + "/" + id, requestOptions)
                .then(res => res.json())
                .catch(error => error)
                .then((res) => {
                    if (res.ok === true) {
                        setUser(res.data);
                    } else {
                        setToken(null)
                        setError(res.error)
                    }
                })
                .catch((err) => setError(err))
                .finally(() => setRefresh(!refresh))
        }
    }, [refresh])
    console.log(error)

    /*     let profile = null;
     */


    return (
        <>
            <br />
            <br />
            <div className='main-container'>
                <div className="container">
                    <div className="profile-image">
                        <img src={user.foto} alt={user.name} />
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-name">{user.name}</h1>
                        <h2 className="profile-email">{user.email}</h2>
                        <h3 className="profile-type">{type}</h3>
                    </div>
                </div>
                <br />
                <hr />
                {(() => {
                    switch (type) {
                        case 'volunteers':
                            return (
                                <div className='main-workshops'>
                                    <h2>My workshops</h2>
                                    <br />
                                    <div className='workshops'>
                                        <div className='add-workshop'>
                                            <Link to='/Services'><FontAwesomeIcon icon={faPlus} size="2xl" style={{ color: "#a1a1a1", }} /></Link>
                                            <br />
                                            <p>Create a workshop</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        case 'tutor':
                            return (
                                <div className='main-workshops'>
                                    <h2>My Clients</h2>
                                    <br />
                                </div>
                            );
                        default:
                            return (
                                <div className='main-workshops'>
                                    <h2>My workshops</h2>
                                    <br />
                                    <div className='workshops'>
                                        <div className='add-workshop'>
                                            <Link to='/Services'><FontAwesomeIcon icon={faPlus} size="2xl" style={{ color: "#a1a1a1", }} /></Link>
                                            <br />
                                            <p>Browse Workshops</p>
                                        </div>
                                    </div>
                                </div>
                            );
                    }
                })()}
            </div>
        </>
    );
}

export default Perfil;

