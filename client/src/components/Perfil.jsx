import { useContext, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
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
    const [showM, setShowM] = useState(false);
    const [userEdit, setUserEdit] = useState({});
    const [changeDescription, setChangeDescription] = useState(false);
    const desc = () => {
        setShowM(false);
        setChangeDescription(false);
    }
    

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

    const editUser = () => {        
        const fdata = new FormData() //para guardar una imagen se tiene que hacer en formato formData() en vez de JSON.stringify()
        fdata.append("name", userEdit.name);
        fdata.append("email", userEdit.email);        
        fdata.append("file", userEdit.foto);
        fdata.append("id", userEdit.id); //mejor que id, cuanto menos globalcontext menos carga. por consistencia de codigo: userEdit en vez de user 
        if((type === "volunteers") || (type === "tutor")){
            fdata.append("description", userEdit.description)
        }
        const requested = {
            method: 'PUT',
            headers: {authorization: token},
            body: fdata 
        };
        fetch(API_URL + type + "/", requested)
            .then(res=>res.json())
            .catch(err => err)
            .then((res)=>{
                if(res.ok === true){
                    setRefresh(true),
                    setShowM(false)
                } else {
                    setShowM(false),
                    setToken(null),
                    setError(res.error)
                }
            })
            .catch((err)=>setError(err))
    }

    

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
                        <h3 className="profile-type">{type}</h3>
                    </div>
                    <div className="profile-button">
                        <div ><Button onClick={() => { setShowM(true); setUserEdit({...user}) }}>Edit information</Button></div>
                    </div>

                </div>
                {((type === "volunteers") || (type === "tutor"))
                    ? <div className="descritione">
                        {user.description && <> <p><b>My description:</b></p><p>{user.description}</p> </>}

                    </div>

                    : <></>}

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
            <Modal show={showM} onHide={() => desc()}>
                <Modal.Header closeButton>
                    <Modal.Title>Personal information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="formEditPerfil">
                        <label>
                            Name:
                            <input type="text" value={userEdit.name} onChange={e => setUserEdit({...userEdit,name: e.target.value})} required/>
                        </label>
                        <label>
                            Email:
                            <input type="text" value={userEdit.email} onChange={e => setUserEdit({...userEdit,email: e.target.value.trim()})} />
                        </label>

                        {((type === "volunteers") || (type === "tutor"))
                            ? <>
                                {(user.description || changeDescription)
                                    ? <label>
                                        Description:
                            <input type="text" value={userEdit.description} onChange={e => setUserEdit({...userEdit, description: e.target.value})} />
                                    </label>
                                    :  <>
                                    <button className="buttondes" type="button" onClick={() => setChangeDescription(true)}>+ Add description</button>
                                    <p ><i>Think that it's going to be very useful for the users to know a little bit more about you.</i></p>
                                </>
                                }
                            </>
                            : <></>}

                        <label>
                            <p>Image:</p>
                            <input type="file" onChange={e => setUserEdit({...userEdit, foto: e.target.files[0]})} />
                        </label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" size="m" onClick={editUser} >Edit</Button>
                    <Button variant="secondary" size="m" onClick={() => setShowM(false)}>Cancel</Button>
                </Modal.Footer>

            </Modal>

        </>
    );
}

export default Perfil;

