import GlobalContext from "../GlobalContext";
import { useContext, useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import API_URL from '../apiconfig';

function SerVerification({serviceControl, closeVerification, closeAndRefresh}){
    const {token} = useContext(GlobalContext)
    const [allVerification, setAllVerification] = useState(serviceControl.Users.map(el => el.Users_services.verification));    
    const listParticipants = serviceControl.Users && serviceControl.Users.map((el, index) => {        
        return{
            idUser: el.id, 
            idService: serviceControl.id, 
            verification : allVerification[index] 
        };        
    })         

    //al definir la variable nameParticipants primero y luego poner que depende de si existen users o no me haga el map hago que al llamar a nameParticipants
    //mas abajo en el return si no hay users, no me pete al no encontrar nameParticipants (por si pongo la condicion antes de crearlo). lo que me recibe entonces
    //es un array vacio y simplemente no muestra nada
    const nameParticipants = serviceControl.Users && serviceControl.Users.map((el,index) => {
        return(
            <tr key={index}>
                    <td>{el.name} ({el.email})</td>
                    <td>
                        <select value={allVerification[index]} onChange={(e)=>{
                            allVerification[index] = e.target.value
                            setAllVerification([...allVerification])
                        }}>
                            <option value="0">Not acquired</option>
                            <option value="1">Acquired</option>
                        </select>
                    </td>
                </tr>
        )
    })
    console.log(nameParticipants)

    const sendForm = () => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', authorization: token},
            body: JSON.stringify(listParticipants)
        };
        fetch(API_URL + "usersServices", requestOptions )
            .then(res => res.json()) //ponemos esto siempre antes para que le de tiempo a hacer la conversion a json de todas las promises que ha hecho en el back (en este caso tengo + d1)
            //recordemos que el fetch espera con los then a que se haya completado para pasar a lo siguiente
            .then(res => 
                {                                           
                    if(res.status === 401 || res.error === 'token absent') {
                        setToken(null)
                        setError(res.error)
                        // setToastOptions({body: 'There was an error', title:'Unauthorize exception' })
                    } else if(res.status !== 200){ //esto lo pongo para que me entre si hay otro error que no sea el del token. si pusiera solo else entraria tbb cuando no hay ningun error
                        setError(res.error)
                        console.log("hola")
                    }
                })
            .catch(err => console.log("error", error))
            .finally(()=>closeAndRefresh())
    }

    return(
        <Modal show={serviceControl} onHide={closeVerification}>
            <Modal.Header closeButton>
                <Modal.Title>Validate the participants!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table>
                    <thead><tr><th>Name (email)</th><th>{serviceControl.Competency && serviceControl.Competency.name}</th></tr></thead>
                    <tbody>
                        {nameParticipants}
                    </tbody>
                </Table>
                {!!serviceControl.Users.length && <div><Button onClick={sendForm}>Send</Button></div>}
            </Modal.Body>                                                
        </Modal>
    )
}

export default SerVerification;