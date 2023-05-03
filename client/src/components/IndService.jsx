import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import API_URL from '../apiconfig';
import GlobalContext from '../GlobalContext';
import {Button} from 'react-bootstrap'
import './IndService.css'

function IndService() {
    const {token} = useContext(GlobalContext);
    const { id } = useParams();
    const [data, setData] = useState(null);    
    const [refresh, setRefresh] = useState(true);
    useEffect(() => {
        if(refresh){
        fetch(API_URL + `services/` + id, {
            headers: { 'Content-Type': 'application/json'}
        })
            .then((response) => response.json())
            .then((data) => setData(data))
            .then(()=>setRefresh(!refresh))
        }}, [id, refresh]);

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
