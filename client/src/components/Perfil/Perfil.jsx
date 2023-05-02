import { useContext, useEffect, useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import GlobalContext from "../../GlobalContext";
import API_URL from '../../apiconfig';
import './Perfil.css';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEnvelope, faPen } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { userTypes } from './constants';
import { getUser } from './services';




function Perfil() {

    const goTo = useNavigate();
    const {id, type} = useParams();
    const { setToken, token, email, setEmail } = useContext(GlobalContext);
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

    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [work_type, setWorktype] = useState('');


    useEffect(() => {
        if(refresh)
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
    }, [refresh])

    useEffect(() =>{
        setRefresh(true)
    }, [id, type])

    const editUser = () => {        
        const fdata = new FormData() //para guardar una imagen se tiene que hacer en formato formData() en vez de JSON.stringify()
        fdata.append("name", userEdit.name);
        fdata.append("email", userEdit.email);        
        fdata.append("file", userEdit.foto);
        fdata.append("id", userEdit.id); //mejor que id, cuanto menos globalcontext menos carga. por consistencia de codigo: userEdit en vez de user 
        if(userTypes[type] !== userTypes.users){
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
                    setRefresh(true)
                    setEmail(userEdit.email);
                    setShowM(false)
                } else {
                    setShowM(false),
                    setToken(null),
                    setError(res.error)
                }
            })
            .catch((err)=>setError(err))
    }

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description, date, time, work_type,  })
        };

        fetch( + 'services', options)
        handleClose();
        goTo('/Services')
    };
    
     //ojo aqui, no me puede hacer un map de algo que no existe (objeto vacio)
        let myClients = (userTypes[type] === userTypes.tutor && user && user.Users) ? user.Users.map((el, index)=> {
            return(
                    <tr key={el.id}>
                       <td><Link to={`/perfil/users/${el.id}`}> {el.name}</Link></td>
                        <td>{el.email}</td>
                    </tr>
            )
        }) : <>There are no users under your responsability at the moment.</>
    
    
    if(!user)
        {return <h3>Cargando</h3>}
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
                        <div ><Button onClick={() => { setShowM(true); setUserEdit({...user}) }}>Edit <FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button></div>
                    </div>
                :  <div className="profile-button"><div><a href={`mailto:${user.email}`}><Button>Send email <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon></Button></a></div></div>}

                </div>
                {(userTypes[type] !== userTypes.users)
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
                                <>
                                    <div className='main-workshops'>
                                        <h2>My workshops</h2>
                                        <br />
                                        <div className='workshops'>
                                            <div className='add-workshop'>
                                                <FontAwesomeIcon icon={faPlus} size="2xl" style={{ color: "#a1a1a1", }} />
                                                <br />
                                                <p onClick={handleShow}>Create a workshop</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Create a Workshop</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <form>
                                                <div className="form-group">
                                                    <label >Workshop Name</label>
                                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                                </div>
                                                <div className="form-group">
                                                    <label >Description</label>
                                                    <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                                                </div>
                                                <div className="form-group">
                                                    <label >Date</label>
                                                    <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
                                                </div>
                                                <div className="form-group">
                                                    <label >Time</label>
                                                    <input type="time" className="form-control" value={time} onChange={(e) => setTime(e.target.value)} />
                                                </div>
                                                {/* <div className="form-group">
                                                    <label >Image:</label>
                                                    <input type="file" className="form-control-file" onChange={(e) => setFoto(e.target.files[0])} />
                                                </div> */}
                                                {/* <div className="form-group">
                                                    <label >Type</label>
                                                    <select className="form-control" onChange={(e) => setTipo(e.target.value)}>
                                                        <option value="0">--Select Type--</option>
                                                        <option value="2">Workshop</option>
                                                        <option value="1">Therapy</option>
                                                    </select>
                                                </div> */}
                                                <div className="form-group">
                                                    <label >Subtype</label>
                                                    <select className="form-control" onChange={(e) => setWorktype(e.target.value)}>
                                                        <option value="0">--Select Type--</option>
                                                        <option value="1">Painting</option>
                                                        <option value="2">Sculpture</option>
                                                        <option value="3">Kungfu</option>
                                                        <option value="4">Ceramic</option>
                                                    </select>
                                                </div>
                                            </form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <button className="btn btn-primary" onClick={handleSubmit}>Create</button>
                                            <button className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                                        </Modal.Footer>
                                    </Modal>
                                </>
                            );
                        case 'tutor':
                            return (
                                <div className='main-workshops'>
                                <h3>My clients</h3>
                                <Table>
                                    <thead><tr><th>Name</th><th>Email</th></tr></thead>
                                    <tbody>
                                    {myClients}
                                    </tbody>
                                </Table>
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
            {userEdit && <Modal show={showM} onHide={() => desc()}>
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

                        {(userTypes[type] !== userTypes.users)
                            ? <>
                                {(user.description || changeDescription)
                                    ? <label >
                                        Description:
                            <textarea className="form-control-textarea" type="text" value={userEdit.description} onChange={e => setUserEdit({...userEdit, description: e.target.value})} />
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
                            <input type="file" accept="image/png, image/gif, image/jpeg, image/jpg" onChange={e => setUserEdit({...userEdit, foto: e.target.files[0]})} />
                        </label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" size="m" onClick={editUser} >Edit</Button>
                    <Button variant="secondary" size="m" onClick={() => setShowM(false)}>Cancel</Button>
                </Modal.Footer>

            </Modal>}

        </>
    );
}

export default Perfil;

