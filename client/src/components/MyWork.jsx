import './MyWork.css'
import GlobalContext from "../GlobalContext";
import { useContext, useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'react-bootstrap';

function MyWork() {

    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [work_type, setWorktype] = useState('');
    const goTo = useNavigate();

    const { type } = useContext(GlobalContext);

    const userTypes = {
        tutor: 'tutor',
        volunteers: 'volunteers',
        users: 'users'
    }

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description, date, time, work_type, })
        };

        fetch(API_URL + 'services', options)
        handleClose();
        goTo('/Services')
    };

    return (
        <>
            {(userTypes[type] === userTypes.volunteers)
                ? <>
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
                : <>
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
                </>}
        </>
    )
}

export default MyWork;