import { useContext, useEffect, useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import GlobalContext from "../../GlobalContext";
import API_URL from '../../apiconfig';
import './Perfil.css';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPen } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { userTypes } from './constants';
import { getUser } from './services';
import Avatar from 'react-avatar';



function Perfil() {

    const { id, type } = useParams();
    const { setToken, token, email, setEmail, logout } = useContext(GlobalContext);
    const [refresh, setRefresh] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [showM, setShowM] = useState(false);
    const [userEdit, setUserEdit] = useState(null);
    const [changeDescription, setChangeDescription] = useState(false);

    const desc = () => {
        setShowM(false);
        setChangeDescription(false);
    }


    useEffect(() => {
        if (refresh && token)
            getUser(token, type, id)
                .then((res) => {
                    if (res.ok) {
                        setUser(res.data);
                    } else {
                        setToken(null)
                        setError(res.error)
                    }
                })
                .catch((err) => setError(err))
                .finally(() => setRefresh(!refresh))
    }, [refresh, token])

    useEffect(() => {
        setRefresh(true)
/*              localStorage.setItem('userId', id);
 */    }, [id, type])

    const editUser = () => {
        const fdata = new FormData() //para guardar una imagen se tiene que hacer en formato formData() en vez de JSON.stringify()
        fdata.append("name", userEdit.name);
        fdata.append("email", userEdit.email);
        fdata.append("file", userEdit.foto);
        fdata.append("id", userEdit.id); //mejor que id, cuanto menos globalcontext menos carga. por consistencia de codigo: userEdit en vez de user 
        if (userTypes[type] !== userTypes.users) {
            fdata.append("description", userEdit.description)
        }
        const requested = {
            method: 'PUT',
            headers: { authorization: token },
            body: fdata
        };
        fetch(API_URL + type + "/", requested)
            .then(res => res.json())
            .catch(err => err)
            .then((res) => {
                if (res.ok) {
                    setRefresh(true)
                    setEmail(userEdit.email);
                    setShowM(false)
                } else {
                    setShowM(false)
                    setToken(null)
                    setError(res.error)
                }
            })
            .catch((err) => setError(err))
    }

    //función para borrar cuenta
    const deleteAccount = () => {
        const userId = id;

        const data = {
            userId
        };

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', authorization: token },
            body: JSON.stringify(data)
        };

        fetch(API_URL + type, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al crear la entrada en la base de datos');
                } else {
                    return response.json();
                }
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .then((res) => {
                if (res.ok) {
                    setShowM(false)
                    setToken(null)
                    logout()
                }
            })
    }

    //ojo aqui, no me puede hacer un map de algo que no existe (objeto vacio)
    let myClients = (userTypes[type] === userTypes.tutor && user && user.Users) ? user.Users.map((el) => {
        return (
            <tr key={el.id}>
                <td> <Avatar src={"http://localhost:5000/" + (el.foto)} name={el.name} round={true} size="50" /></td>
                <td><Link to={`/perfil/users/${el.id}`}> {el.name}</Link></td>
                <td>{el.email}</td>
            </tr>
        )
    }) : <>There are no users under your responsability at the moment.</>


    let myCompetencies = (userTypes[type] === userTypes.users && user && user.Services) && user.Services.map(el => {
        return (
            <>
                {el.Users_services.verification && <li>{el.Competency.name}</li>}
            </>
        )
    })
    console.log(myCompetencies)
    console.log(user)
    if (!user) { return <h3>Cargando</h3> }


    return (
        <>
            <br />
            <br />
            <div className='main-container'>
                <div className="container">
                    <div className="profile-image">
                        <img src={"http://localhost:5000/" + (user.foto)} alt={user.name} />
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-name">{user.name}</h1>
                        <h2 className="profile-email">{user.email}</h2>
                        {(userTypes[type] === userTypes.users) ? <h3 className="profile-type"><b>My tutor: </b>{user.Tutor && <Link to={`/perfil/tutor/${user.Tutor.id}`}>{user.Tutor.name}</Link>}({user.Tutor && user.Tutor.email})</h3> : <></>}

                    </div>
                    {(email === user.email) ?
                        <div className="profile-button">
                            <div ><Button onClick={() => { setShowM(true); setUserEdit({ ...user }) }}>Edit <FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button></div>
                        </div>
                        : <div className="profile-button"><div><a href={`mailto:${user.email}`}><Button>Send email <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon></Button></a></div></div>}

                </div>
                {(userTypes[type] !== userTypes.users)
                    ? <div className="descritione">
                        {user.description && <> <p><b>My description:</b></p><p>{user.description}</p> </>}
                    </div>
                    : <></>}

                <br />
                <hr />


                {(userTypes[type] === userTypes.tutor)
                    ? <div className='main-workshops'>
                        <h3>My clients</h3>
                        <Table>
                            <thead><tr><th></th><th>Name</th><th>Email</th></tr></thead>
                            <tbody>
                                {myClients}
                            </tbody>
                        </Table>
                    </div>
                    : <></>}

                {(userTypes[type] === userTypes.users) &&
                    <>
                        <h3>My competencies</h3>
                        {(user && user.Services) && user.Services.some((compe) => compe.Users_services.verification) ?
                            <div className='main-workshops'>

                                <ul>{myCompetencies}</ul>
                            </div> : <p>You haven't achieved any competencies at the moment.</p>}
                    </>
                }

            </div>
            {userEdit && <Modal show={showM} onHide={() => desc()}>
                <Modal.Header closeButton>
                    <Modal.Title>Personal information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="formEditPerfil">
                        <label>
                            Name:
                            <input type="text" value={userEdit.name} onChange={e => setUserEdit({ ...userEdit, name: e.target.value })} required />
                        </label>
                        <label>
                            Email:
                            <input type="text" value={userEdit.email} onChange={e => setUserEdit({ ...userEdit, email: e.target.value.trim() })} />
                        </label>

                        {(userTypes[type] !== userTypes.users)
                            ? <>
                                {(user.description || changeDescription)
                                    ? <label >
                                        Description:
                                        <textarea className="form-control-textarea" type="text" value={userEdit.description} onChange={e => setUserEdit({ ...userEdit, description: e.target.value })} />
                                    </label>
                                    : <>
                                        <button className="buttondes" type="button" onClick={() => setChangeDescription(true)}>+ Add description</button>
                                        <p ><i>Think that it's going to be very useful for the users to know a little bit more about you.</i></p>
                                    </>
                                }
                            </>
                            : <></>}

                        <label>
                            <p>Image:</p>
                            <input type="file" accept="image/png, image/gif, image/jpeg, image/jpg" onChange={e => setUserEdit({ ...userEdit, foto: e.target.files[0] })} />
                        </label>
                    </div>
                    <p>Want to delete your account?</p>
                    <Button variant="danger" size="m" onClick={deleteAccount} >Delete Account</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" size="m" onClick={editUser} >Edit</Button>
                    <Button variant="secondary" size="m" onClick={desc}>Cancel</Button>
                </Modal.Footer>

            </Modal>}

        </>
    );
}

export default Perfil;

