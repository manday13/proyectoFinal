import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import API_URL from '../apiconfig';
import GlobalContext from '../GlobalContext';

import {Button} from 'react-bootstrap'
import './IndService.css'

function IndService() {
    const { id, token} = useContext(GlobalContext);
    const { ids } = useParams();
    const [data, setData] = useState(null);    
    const [refresh, setRefresh] = useState(true);
    const [ableButton, setAbleButton] = useState(false);
    
    useEffect(() => {
        if(refresh){
        fetch(API_URL + `services/` + ids, {
            headers: { 'Content-Type': 'application/json'}
        })
            .then((response) => response.json())
            .then((data) => setData(data))
            .then(()=>setRefresh(!refresh))
        }}, [ids, refresh]);

    if (!data) {
        return <div>Loading...</div>;
    }
    console.log(data)

    let Clients = (data && data.data && data.data.Users) ? data.data.Users.map((el,index) =>{
        return(
            <li key={el.id}><Link to={`/perfil/users/${el.id}`}>{el.name}</Link></li>
        )
    })
    : <>There are no users participating at the moment.</>

    const participate = () => {
        const id_u = id;
        const id_s = ids;
        const verification = 0;

        const data = {
            id_u,
            id_s,
            verification
        };

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };

        fetch(API_URL+'usersServices', requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al crear la entrada en la base de datos');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error:', error);
            })
            // .finally(()=>setRefresh(true))
    }

    return (
        <>
            <div className='wholepage'>
                <div className='infoservice'>
                    <img className='wsimg' src="https://placekitten.com/300/150" />
                    <h1 className='wsname compename'><b>{data.data && data.data.name}</b></h1>
                    <p className='wsdesc'><b>Description:</b> {data.data && data.data.description}</p>
                    <p className='wsdata'><b>Date:</b> {data.data && data.data.date}</p>
                    <p><b>At:</b> {data.data && data.data.time} h</p>
                    <p><b>Address:</b> {data.data && data.data.address}</p>
                    <Link to="/services" >Back to browse workshops</Link>
                    <br />
                    <Button variant="primary" disabled={ableButton} onClick={()=>{participate; setAbleButton(true)}}>Participate</Button>
                </div>
                <div className='side'>
                    <div className='wsbadges'>
                        <h2><b>Badges you will get:</b></h2>
                        {(data.data && data.data.Competency) &&
                        <>
                            <p className="compename">{data.data.Competency.name }</p>
                            <p>{data.data.Competency.description}</p>
                            <Link to="/about/support"><Button>Know more about</Button></Link>
                            </>}
                    </div>
                    <div className='wsclients'>
                        <h2><b>Participants:</b></h2>
                        
                        {token ? <ul>{Clients}</ul> : 
                        <>
                        <p>If you want to see more, please:</p>
                        <div className="buttonparticipant"><Link to="/signSelect"><Button>Log in</Button></Link> or <Link to="/register"><Button>Register</Button></Link></div>
                        </>}
                    </div>
                    
                </div>
            </div>
            <br />
            <br />

        </>
    );
}

export default IndService;
