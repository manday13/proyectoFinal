import { useContext, useEffect, useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import GlobalContext from "../../GlobalContext";
import API_URL from '../../apiconfig';
import './Perfil.css';
import '../MyWork.css'
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPen, faArrowRight, faFile, faCalendar, faClock, faCircleInfo, faMinus, faLanguage, faFilm } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { userTypes } from './constants';
import { getUser } from './services';
import { validateEmail } from './utils';
import Avatar from 'react-avatar';
import LetterRecomendation from './LetterRecomendation';
import { ToastComponent } from '../ToastComponent';



function Perfil() {

    const { id, type } = useParams();
    const { setToken, token, email, setEmail, logout } = useContext(GlobalContext);
    const [refresh, setRefresh] = useState(true);
    const [error, setError] = useState(null);
    const [idc, setIdc] = useState(null);
    const [user, setUser] = useState(null);
    const [showM, setShowM] = useState(false);
    const [showCompetency, setShowCompetency] = useState(false);
    const [userEdit, setUserEdit] = useState(null);
    const [changeDescription, setChangeDescription] = useState(false);
    const [askDel, setAskDel] = useState(false);
    const [userForLetter, setUserForLetter] = useState(null);
    const [toastOptions, setToastOptions] =  useState(null)
    const [controlError, setControlError] = useState({name: false, email: false})

    const notShowLetter = () => setUserForLetter(null);
    const closeAndRefresh = () =>{
        setUserForLetter(null)
        setRefresh(true)
    }
    const tokenExpired = () => {
        setUserForLetter(null)
        setToken()
    }
    const desc = () => {
        setShowM(false);
        setChangeDescription(false);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    useEffect(() => {
        if (refresh && token)
            getUser(token, type, id)
                .then((res) => {
                    if(res.ok){
                        setUser(res.data)
                    }
                    else if(res.status === 401 ) {
                        setToken(null)
                        setError(res.error)
                        setToastOptions({body: 'There was an error', title:'Unauthorize exception' })
                    } else{
                        setError(res.error)
                    }
                })
                .catch((error) => {
                    setToken(null)
                    setError(res.error)
                    setToastOptions({body: 'There was an error', title:'muy mal' })
                })
                .finally(() => setRefresh(!refresh))
    }, [refresh, token])

    useEffect(() => {
        setRefresh(true)
    }, [id, type])

    const editUser = () => {
        const copycontrolError = {...controlError}        
        copycontrolError.name = !userEdit.name || userEdit.name.trim() === ''
        copycontrolError.email = !validateEmail(userEdit.email)        
        setControlError({...copycontrolError})
        if(Object.values(copycontrolError).some(el => el === true)){
            return
        }

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
                } else if(res.status === 401 ){
                    setShowM(false)
                    setToken(null)
                    setError(res.error)
                }else{
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
                }else if(res.status === 401 ){
                    setShowM(false)
                    setToken(null)
                    setError(res.error)
                }else{
                    setError(res.error)
                }
            })
    }

    const askDelAccount = () => {
        setAskDel(true);
    }
    const askNo = () => {
        setAskDel(false);
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


    let myCompetencies = (userTypes[type] === userTypes.users && user && user.Services) && user.Services.map((el, index) => {
        return (
            <>
                {!!el.Users_services.verification &&
                    <li>{el.Competency.name} <button className="buttonCompetencies" onClick={() => { setIdc(index + 1); setShowCompetency(true) }}><FontAwesomeIcon icon={faCircleInfo}/></button></li>}
            </>
        )
    })



    const myWorkshopstodo = (isDone) =>
    (userTypes[type] === userTypes.volunteers && email !== user.email && user && user.Services) && user.Services.filter(el =>
            isDone ?
                new Date(`${el.date}T${el.time}`).getTime() > new Date().getTime() :
                new Date(`${el.date}T${el.time}`).getTime() < new Date().getTime()
        ).map(el =>
            <div key={el.id} className="workshops">
                <Link to={`/IndService/${el.id}`}>              
                    <div className={`add-workshop-dif ${!isDone && "filterw"}`} >
                        <h5 className="titlework otherColor"><b>{el.name}</b></h5>
                        <div style={{ width: "fit-content", margin: "auto" }}><Avatar name={el.name} round={true} size="60" /></div>
                        <div className="text-muted" style={{ marginTop: "10px" }}>
                            <p><FontAwesomeIcon icon={faCalendar} />  {el.date}</p>
                            <p><FontAwesomeIcon icon={faClock} />   {el.time}</p>
                        </div>
                    </div>                   
                </Link>
            </div>) || <></>


    if (!user) { return (
        <>
        {toastOptions && <ToastComponent body={toastOptions.body} title={toastOptions.title}/>}
        <h3>Cargando</h3>
        </>
    ) }

    return (
        <>
            <br />
            <br />
            <div className='main-container'>
                <div className="containerP">
                    <div className="profile-image">
                        <Avatar src={"http://localhost:5000/" + (user.foto)} name={user.name} round={true} size="160" />
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-name">{user.name}<i class="bi bi-info-circle" style={{fontSize: "2rem", color: "cornflowerblue"}}></i></h1>
                        <h2 className="profile-email">{user.email}</h2>
                        {(userTypes[type] === userTypes.users) ? <h3 className="profile-type"><b>My tutor: </b>{user.Tutor && <Link to={`/perfil/tutor/${user.Tutor.id}`}>{user.Tutor.name}</Link>}({user.Tutor && user.Tutor.email})</h3> : <></>}
                        {/* <div className='languageHobbie'>
                        <p className='language'><span style={{color: "grey"}}><FontAwesomeIcon icon={faLanguage}/> Languages:  </span> English, Spanish</p>
                        <p><span style={{color: "grey"}}><FontAwesomeIcon icon={faFilm}/>  Hobbies:</span> Cycling</p>
                        </div> */}
                        
                    </div>
                    {(email === user.email) ?
                        <div className="profile-button">
                            <div ><Button onClick={() => { setShowM(true); setAskDel(false); setUserEdit({ ...user }) }}>Edit <FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button></div>
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
                    <div className='main-workshops competencies-letter'>
                        <div className='competencies'>
                            <h3>My competencies</h3>
                            {(user && user.Services) && user.Services.some((compe) => compe.Users_services.verification) ?


                                <ul>{myCompetencies}</ul>
                                : (email === user.email) ? <p><i>You haven't achieved any competencies at the moment.</i></p> : <p><i>There are no competencies achieved at the moment.</i></p>}
                        </div>
                        <div className='letter'>
                            {user.Tutor &&
                                (email === user.Tutor.email || (user.letter && email === user.email)) &&
                                <>
                                    <h3>Letter of recommendation</h3>
                                    {user.letter && <p><FontAwesomeIcon style={{ marginLeft: "15px" }} icon={faArrowRight}></FontAwesomeIcon>    <a href={"http://localhost:5000/letters/" + (user.letter)} download={user.letter.split('-')[1] } target="_blank">{user.letter.split('-')[1]}   <FontAwesomeIcon icon={faFile}/></a> </p>}
                                    {(email === user.Tutor.email) &&
                                        <button className="upload" onClick={() => setUserForLetter(user)}>{user.letter ? "Edit document" : "Upload document"}</button>}
                                </>
                            }

                        </div>
                    </div>
                }

                {(userTypes[type] === userTypes.volunteers) && 
                <div className='main-workshops'>
                    {email !== user.email &&  
                    <>
                    <h2 style={{marginBottom: "40px"}}><b>Workshops that are organised by {user.name}: </b></h2>
                    <div className="allmyworkshops">                                     
                       {!!(myWorkshopstodo(true).length) ? myWorkshopstodo(true) : <p><i>There are no future workshops organised by {user.name} at the moment.</i></p>}
                    </div>
                    </>
                    }
                    </div>
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
                            <input type="text" value={userEdit.name} onChange={e => setUserEdit({ ...userEdit, name: e.target.value })} />
                            {controlError.name && <small style={{color: 'red'}}>You must right a name</small>}
                        </label>
                        <label>
                            Email:
                            <input type="email" value={userEdit.email} onChange={e => setUserEdit({ ...userEdit, email: e.target.value.trim() })} />
                            {controlError.email && <small style={{color: 'red'}}>Please right an email like "something@something.com"</small>}
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
                    <Button variant="danger" size="m" onClick={askDelAccount} >Delete Account</Button>
                    {askDel ?
                        <>
                            <div>
                                <br />
                                <b>Are you sure?   </b>
                                <Button variant="danger" size="m" onClick={deleteAccount} >YES</Button>
                                <Button className='delete-button-for-edit' variant="primary" size="m" onClick={askNo} >NO</Button>
                            </div>
                        </>
                        :
                        <></>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" size="m" onClick={editUser} >Edit</Button>
                    <Button variant="secondary" size="m" onClick={desc}>Cancel</Button>
                </Modal.Footer>

            </Modal>}
            {user.Services && idc &&
                <Modal show={showCompetency} onHide={() => setShowCompetency(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{user.Services[idc - 1].Competency.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{user.Services[idc - 1].Competency.description}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Link to="/about/support"><Button variant="primary" size="m" >Know more</Button></Link>
                    </Modal.Footer>
                </Modal>}
            {userForLetter && <LetterRecomendation userForLetter={userForLetter} notShowLetter={notShowLetter} closeAndRefresh={closeAndRefresh} tokenExpired={tokenExpired} />}

        </>
    );
}

export default Perfil;

