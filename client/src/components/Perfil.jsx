import { useContext, useEffect, useState } from 'react';
import GlobalContext from "../GlobalContext";
import API_URL from '../apiconfig';
import './Perfil.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';



function Perfil() {

    const goTo = useNavigate();

    const { id, setToken, token, type } = useContext(GlobalContext);
    const [refresh, setRefresh] = useState(true);
    const [error, setError] = useState('');
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);
/*     const [foto, setFoto] = useState('');
 */ const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [tipo, setTipo] = useState('');
    const [work_type, setWorktype] = useState('');



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

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description, date, time, work_type,  })
        };

        fetch(API_URL + 'services', options)
        handleClose();
        goTo('/Services')
    };


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

