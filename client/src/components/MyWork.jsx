import './MyWork.css'
import GlobalContext from "../GlobalContext";
import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faClock, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'react-bootstrap';
import API_URL from '../apiconfig';
import Avatar from 'react-avatar';
import SerVerification from "./SerVerification";

function MyWork() {
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const [name, setName] = useState(null);
    const [date, setDate] = useState(null);
    const [description, setDescription] = useState(null);
    const [time, setTime] = useState(null);
    const [work_type, setWorktype] = useState(null);
    const [serviceType, setServicetype] = useState(null);
    const [address, setAddress] = useState(null);
    const [id_c, setId_c] = useState(null);
    const [serviceControl, setServiceControl] = useState(null);
    const [myServices, setMyServices] = useState(null);
    const [refresh, setRefresh] = useState(true);  
    const [data, setData] = useState(null); 
    const [limit, setLimit] = useState(null);
    const [controlError, setControlError] = useState({
        name: false, description: false, address: false, date: false, time: false, serviceType : false, workType:false, competency: false, limit: false
    })   
    const { type, role, id, setToken, token } = useContext(GlobalContext);
    const userTypes = {
        tutor: 'tutor',
        volunteers: 'volunteers',
        users: 'users'
    }

    const roleType = {
        artist: 1,
        therapist: 3
    }

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false)
        setDate(null)
        setName(null);
        setAddress(null);
        setTime(null);
        setDescription(null);
        setId_c(null);
        setLimit(null);
    
    };
    const closeVerification = () => setServiceControl(null);

    const closeAndRefresh = () => {
        setServiceControl(null)
        setRefresh(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const copycontrolError = {...controlError} //hago una copia del controlError que creo simplemente en la funcion y me servira para evitar los problemas
        //de sincronizacion a la hora de hacer el seter de la funcion controlError (evitando que me lo haga más tarde de lo que yo necesito)
        //lo que hare sera entonces mirar en los atirbutos de este objeto --> los atributos de un objeto se pueden cambiar sin mas NO UNA CONSTANTE (definimos el objeto
        //como una constante pero no sus atirbutos). Luego seteo el controlError a este objeto copiado para que me aparezcan los mensajes de aviso en los inputs, ya
        //que este copycontrolError esta definido simplemente aqui
        copycontrolError.name = !name || name.trim() === ' '
        copycontrolError.description = !description || description.trim() === ' '
        copycontrolError.address = !address || address.trim() === ' '
        copycontrolError.date = !date
        copycontrolError.time = !time
        copycontrolError.serviceType = !serviceType || serviceType === '0'
        copycontrolError.workType = !work_type || work_type === '0'
        copycontrolError.competency = !id_c || id_c === '0'
        copycontrolError.limit = !limit || parseInt(limit) <= 0  //el type number me devuelve en numero como string, con el parseInt lo paso a integer y asi puedo hacer la comparacion mas compleja
               
        setControlError({...copycontrolError})       
        if(Object.values(copycontrolError).some(el => el === true)){
            return;
        }

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', authorization: token },
            body: JSON.stringify({ name, description, date, time, work_type, serviceType, address, id_c, "id_v": id, limit })
        };

        fetch(API_URL + 'services', options)
            .then(res => res.json())
            .catch(err => err)
            .then((res) => {
                if (res.ok) {
                    setRefresh(true)
                    handleClose()
                } else if(res.status === 401 ){
                    setToken(null)
                    handleClose()
                }else{
                    setError(res.error)
                }
            })
            .catch((err) => console.log(err))
    };

    useEffect(() => {
        if (refresh) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', authorization: token }
            };
            fetch(API_URL + type + "/" + id, requestOptions)
                .then(res => res.json())
                .catch(err => err)
                .then((res) => {
                    if (res.ok) {
                        setMyServices(res.data.Services);
                        setData(res.data);
                    } else if(res.status === 401 ){
                        setToken(null)
                    } else{
                        setError(res.error)
                    }
                })
                .catch((err) => console.log(err))
                .finally(() => setRefresh(!refresh))
        }
    }, [refresh])
    

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        const currentDate = new Date().toISOString().split('T')[0];
        if (selectedDate < currentDate) {
            alert('Please select a newer date.');
            setDate('');
        } else {
            setDate(selectedDate);
        }
    };

    const myWorkshopstodo = (isDone) =>
        myServices && myServices.filter(el =>
            isDone ?
                new Date(`${el.date}T${el.time}`).getTime() > new Date().getTime() :
                new Date(`${el.date}T${el.time}`).getTime() < new Date().getTime()
        ).sort((a,b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime()).map(el =>
            <div key={el.id} className="workshops">
                <Link to={isDone || userTypes[type] === userTypes.users ? `/IndService/${el.id}` : "#"}>
                    <div className={`add-workshop-dif ${!isDone && "filterw"}`} onClick={() => !isDone && userTypes[type] === userTypes.volunteers && setServiceControl(el)}>
                        <h5 className="titlework"><b>{el.name}</b></h5>
                        <div style={{ width: "fit-content", margin: "auto" }}><Avatar className={`${!isDone && "blanck"}`} src={"http://localhost:5000/fotoServices/" + (el.foto)} name={el.name} round={true} size="60" /></div>
                        <div className="text-muted" style={{ marginTop: "10px" }}>
                            <p><FontAwesomeIcon icon={faCalendar} />  {el.date}</p>
                            <p><FontAwesomeIcon icon={faClock} />   {el.time}</p>
                        </div>
                    </div>
                </Link>
            </div>) || <></>


    let returnItem = (
        <>
            <div className='main-workshops'>
                <h2 style={{ margin: "0" }}><b>My workshops</b></h2>
                <br />
                <div className="allmyworkshops">
                    <div className='workshops'>
                        <Link to='/Services'>
                            <div className='add-workshop'>
                                <FontAwesomeIcon icon={faPlus} size="2xl" style={{ color: "#a1a1a1" }} />
                                <br />
                                <p>Browse Workshops</p>
                            </div>
                        </Link>
                    </div>
                    {myWorkshopstodo(true)}
                </div>
            </div>
            <hr style={{ margin: "3rem 0" }} />
            <div className='main-workshops '>
                <div className="allmyworkshops">
                    {myWorkshopstodo(false)}
                </div>
            </div>
        </>
    )


    if (userTypes[type] === userTypes.volunteers && (role == roleType.artist)) {

        returnItem = (
            <>
                <div className='main-workshops'>
                    <h2 style={{ margin: "0" }}><b>My workshops</b></h2>
                    <br />
                    <div className="allmyworkshops">
                        <div className='workshops'>
                            <div onClick={handleShow} className='add-workshop'>
                                <FontAwesomeIcon icon={faPlus} size="2xl" style={{ color: "#a1a1a1" }} />
                                <br />
                                <p>Create a workshop</p>
                            </div>
                        </div>
                        {myWorkshopstodo(true)}
                    </div>
                </div>
                <hr style={{ margin: "3rem 0" }} />
                <div className='main-workshops '>
                    <div className="allmyworkshops">
                        {myWorkshopstodo(false)}
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create a Workshop</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label >Workshop Name*</label>
                                <input type="text" className={`form-control ${controlError.name && "toAnswer"}`} value={name} onChange={(e) => setName(e.target.value)} />                                
                            </div>
                            <div className="form-group">
                                <label >Description*</label>
                                <input type="text" className={`form-control ${controlError.description && "toAnswer"}`} value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label >Address*</label>
                                <input type="text" className={`form-control ${controlError.address && "toAnswer"}`} value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label >Date*</label>
                                <input type="date" className={`form-control ${controlError.date && "toAnswer"}`} value={date} onChange={handleDateChange} />
                            </div>
                            <div className="form-group">
                                <label >Time*</label>
                                <input type="time" className={`form-control ${controlError.time && "toAnswer"}`} value={time} onChange={(e) => setTime(e.target.value)} />
                            </div>                            
                            <div className="form-group">
                                <label >Type*</label>
                                <select value={serviceType} className={`form-control ${controlError.serviceType && "toAnswer"}`} onChange={(e) => setServicetype(e.target.value)} >
                                    <option value="0">--Select--</option>
                                    <option value="1" disabled>Thepary</option>
                                    <option value="2">Workshop</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label >Subtype*</label>
                                <select className={`form-control ${controlError.workType && "toAnswer"}`} onChange={(e) => setWorktype(e.target.value)} >
                                    <option value="0">--Select Type--</option>
                                    <option value="1">Painting</option>
                                    <option value="2">Sculpture</option>
                                    <option value="3">Kungfu</option>
                                    <option value="4">Ceramic</option>
                                    <option value="5" disabled> Group THerapy</option>
                                </select>
                            </div>
                            <div>
                                <label >Competency*</label>
                                <select className={`form-control ${controlError.competency && "toAnswer"}`} onChange={(e) => setId_c(e.target.value)} >
                                    <option value="0">--Select Competence--</option>
                                    <option value="1">Comunication skills</option>
                                    <option value="2">Strong commitment</option>
                                    <option value="3">Emotional inteligence</option>
                                    <option value="4">Responsability</option>
                                    <option value="5">A learning mentality</option>
                                </select>
                            </div>
                            <div >
                                <label >Participant limit*</label>
                                {controlError.limit && <small style={{color: 'red'}}>The number of participants must be bigger than 0</small>}
                                <input type="number" className={`form-control ${controlError.limit && "toAnswer"}`} value={limit} onChange={(e) => setLimit(e.target.value)} />
                                
                            </div>
                            {Object.values(controlError).some(el => el === true) && <p style={{color: 'red'}}>*Please fill all the required fields</p>}
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={handleSubmit}>Create</button>
                        <button className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                    </Modal.Footer>
                </Modal>

            </>
        )
    }
    else if (userTypes[type] === userTypes.volunteers && role == roleType.therapist) {
        returnItem = (
            <>
                <div className='main-workshops'>
                    <h2 style={{ margin: "0" }}><b>My workshops</b></h2>
                    <br />
                    <div className="allmyworkshops">
                        <div className='workshops'>
                            <div onClick={handleShow} className='add-workshop'>
                                <FontAwesomeIcon icon={faPlus} size="2xl" style={{ color: "#a1a1a1" }} />
                                <br />
                                <p>Create a therapy session</p>
                            </div>
                        </div>
                        {myWorkshopstodo(true)}
                    </div>
                </div>
                <hr style={{ margin: "3rem 0" }} />
                <div className='main-workshops '>
                    <div className="allmyworkshops">
                        {myWorkshopstodo(false)}
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create a Therapy session</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label >Name</label>
                                <input type="text" className={`form-control ${controlError.name && "toAnswer"}`} value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label >Description</label>
                                <input type="text" className={`form-control ${controlError.description && "toAnswer"}`} value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label >Address</label>
                                <input type="text" className={`form-control ${controlError.address && "toAnswer"}`} value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label >Date</label>
                                <input type="date" className={`form-control ${controlError.date && "toAnswer"}`} value={date} onChange={handleDateChange} />
                            </div>
                            <div className="form-group">
                                <label >Time</label>
                                <input type="time" className={`form-control ${controlError.time && "toAnswer"}`} value={time} onChange={(e) => setTime(e.target.value)} />
                            </div>                            
                            <div className="form-group">
                                <label >Type</label>
                                <select value={serviceType} className={`form-control ${controlError.serviceType && "toAnswer"}`} onChange={(e) => setServicetype(e.target.value)} >
                                    <option value="0">--Select--</option>
                                    <option value="1">Thepary</option>
                                    <option value="2" disabled>Workshop</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Subtype</label>
                                <select value={work_type} className={`form-control ${controlError.workType && "toAnswer"}`} onChange={(e) => setWorktype(e.target.value)} >
                                    <option value="0">--Select Type--</option>
                                    <option value="1" disabled>Painting</option>
                                    <option value="2" disabled>Sculpture</option>
                                    <option value="3" disabled>Kungfu</option>
                                    <option value="4" disabled>Ceramic</option>
                                    <option value="5"> Group THerapy</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label >Competency</label>
                                <select className={`form-control ${controlError.competency && "toAnswer"}`} onChange={(e) => setId_c(e.target.value)} >
                                    <option value="0">--Select Competence--</option>
                                    <option value="1">Asertividad</option>
                                    <option value="2">Asistencia</option>
                                    <option value="3">Comunicacion</option>
                                    <option value="4">Fiabilidad</option>
                                    <option value="5">Adaptabilidad</option>
                                </select>
                            </div>
                            <div >
                                <label >Participant limit</label>
                                {controlError.limit && <small style={{color: 'red'}}>The number of participants must be bigger than 0</small>}
                                <input type="number" className={`form-control ${controlError.limit && "toAnswer"}`} value={limit} onChange={(e) => setLimit(e.target.value)} />
                            </div>
                            {Object.values(controlError).some(el => el === true) && <p style={{color: 'red'}}>*Please fill all the required fills</p>}
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={handleSubmit}>Create</button>
                        <button className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    return (
        <>
            <div className='wholewscontainer'>
                {returnItem}
            </div>
            {serviceControl && <SerVerification serviceControl={serviceControl} closeVerification={closeVerification} closeAndRefresh={closeAndRefresh} />}
        </>
    )
}

export default MyWork;
