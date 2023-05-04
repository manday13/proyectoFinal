import './MyWork.css'
import GlobalContext from "../GlobalContext";
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'react-bootstrap';
import API_URL from '../apiconfig';


function MyWork() {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [work_type, setWorktype] = useState('');
    const [serviceType, setServicetype] = useState('');
    const [address, setAddress] = useState('');
    const [id_c, setId_c] = useState('');
    const [id_v, setId_v] = useState('');
    const goTo = useNavigate();
/*     const id_v = localStorage.getItem('userId');
 */
    const { type, role, id } = useContext(GlobalContext);
    const userTypes = {
        tutor: 'tutor',
        volunteers: 'volunteers',
        users: 'users'
    }

    const roleType = {
        artist: '1',
        therapist: '3'
    }

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description, date, time, work_type, serviceType, address, id_c, "id_v" : id })
        };

        fetch(API_URL + 'services', options)
        handleClose();
        goTo('/Services')
    };

    let returnItem = (
        <div className='main-workshops'>
            <h2>My workshops</h2>
            <br />
            <div className='workshops'>
                <Link to='/Services'>
                    <div className='add-workshop'>
                        <FontAwesomeIcon icon={faPlus} size="2xl" style={{ color: "#a1a1a1" }} />
                        <br />
                        <p>Browse Workshops</p>
                    </div>
                </Link>
            </div>
        </div>
    )

    if (userTypes[type] === userTypes.volunteers && (role == roleType.artist)) {

        returnItem = (
            <>
                <div className='main-workshops'>
                    <h2>My workshops</h2>
                    <br />
                    <div className='workshops'>
                        <div onClick={handleShow} className='add-workshop'>
                            <FontAwesomeIcon icon={faPlus} size="2xl" style={{ color: "#a1a1a1", }} />
                            <br />
                            <p>Create a workshop</p>
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
                                <label >Address</label>
                                <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
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
                            <div className="form-group">
                                <label >Type</label>
                                <select value={serviceType} className="form-control" onChange={(e) => setServicetype(e.target.value)}>
                                    <option value="0">--Select--</option>
                                    <option value="1" disabled>Thepary</option>
                                    <option value="2">Workshop</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label >Subtype</label>
                                <select className="form-control" onChange={(e) => setWorktype(e.target.value)}>
                                    <option value="0">--Select Type--</option>
                                    <option value="1">Painting</option>
                                    <option value="2">Sculpture</option>
                                    <option value="3">Kungfu</option>
                                    <option value="4">Ceramic</option>
                                    <option  value="5" disabled> Group THerapy</option>
                                </select>
                            </div>
                            <div>
                                <label >Competency</label>
                                <select className="form-control" onChange={(e) => setId_c(e.target.value)}>
                                    <option value="0">--Select Competence--</option>
                                    <option value="1">Asertividad</option>
                                    <option value="2">Asistencia</option>
                                    <option value="3">Comunicacion</option>
                                    <option value="4">Fiabilidad</option>
                                    <option value="5">Adaptabilidad</option>
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
        )
    }
    else if (userTypes[type] === userTypes.volunteers && role == roleType.therapist) {
        returnItem = (
            <>
                <div className='main-workshops'>
                    <h2>My therapy sessions</h2>
                    <br />
                    <div className='workshops'>
                        <div onClick={handleShow} className='add-workshop'>
                            <FontAwesomeIcon icon={faPlus} size="2xl" style={{ color: "#a1a1a1", }} />
                            <br />
                            <p>Create a therapy session</p>
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
                                <label >Name</label>
                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label >Description</label>
                                <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label >Address</label>
                                <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
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
                            <div className="form-group">
                                <label >Type</label>
                                <select value={serviceType} className="form-control" onChange={(e) => setServicetype(e.target.value)}>
                                    <option value="0">--Select--</option>
                                    <option value="1">Thepary</option>
                                    <option value="2" disabled>Workshop</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Subtype</label>
                                <select value={work_type} className="form-control" onChange={(e) => setWorktype(e.target.value)}>
                                    <option value="0">--Select Type--</option>
                                    <option value="1" disabled>Painting</option>
                                    <option value="2" disabled>Sculpture</option>
                                    <option value="3" disabled>Kungfu</option>
                                    <option value="4" disabled>Ceramic</option>
                                    <option  value="5"> Group THerapy</option>
                                </select>
                            </div>
                            <div>
                                <label >Competency</label>
                                <select className="form-control" onChange={(e) => setId_c(e.target.value)}>
                                    <option value="0">--Select Competence--</option>
                                    <option value="1">Asertividad</option>
                                    <option value="2">Asistencia</option>
                                    <option value="3">Comunicacion</option>
                                    <option value="4">Fiabilidad</option>
                                    <option value="5">Adaptabilidad</option>
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
        )
    }

    return (
        <>
            <div className='wholewscontainer'>
                {returnItem}
            </div>
        </>
    )
}

export default MyWork;
