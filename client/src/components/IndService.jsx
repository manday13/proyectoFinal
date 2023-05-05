import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import API_URL from '../apiconfig';
import GlobalContext from '../GlobalContext';
import {Button} from 'react-bootstrap'
import './IndService.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faLessThan } from '@fortawesome/free-solid-svg-icons'
// import Avatar from 'react-avatar';
import { Avatar, Tooltip } from 'antd'
// import AvatarGroup from 'react-avatar-group';

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

    // let Clients = (data && data.data && data.data.Users) ? data.data.Users.map((el) =>{
    //     return(
    //         <li key={el.id}><Link to={`/perfil/users/${el.id}`}>{el.name}</Link></li>
    //     )
    // })
    // : <>There are no users participating at the moment.</>

    let Clients2 = (data && data.data && data.data.Users ) && data.data.Users.map((el) =>{
        return(
            <>
            <Link to={`/perfil/users/${el.id}`}><Tooltip title={el.name} placement="top"><Avatar key={el.id} src={"http://localhost:5000/" + (el.foto)} >{el.name[0].toUpperCase()}</Avatar></Tooltip></Link>
            </>
        )
    })
    

    return (
        <>
            <div className='wholepage'>
                <div className='infoservice'>
                <div className='infoserv'>
                    <img className='wsimg' src="https://placekitten.com/300/150" />
                    <h1 className='wsname compename'><b>{data.data && data.data.name}</b></h1>
                    <p className='wsdesc'><b>Description:</b> {data.data && data.data.description}</p>
                    <p className='wsdata'><b>Date:</b> {data.data && data.data.date}</p>
                    <p><b>At:</b> {data.data && data.data.time} h</p>
                    <p><b>Address:</b> {data.data && data.data.address}</p>                                                            
                </div>
                <Link className="servicesAgain" to="/services" ><FontAwesomeIcon icon={faArrowLeft}/>  Back to browse workshops</Link>
                </div>
                
                <div className='side'>
                <Link style={{textDecoration: "none", color: "black"}} to={token ? `/perfil/volunteers/${data.data.Volunteer.id}` : "/signselect"}><div className='wsbadges'>
                        <h2><b>Organised by:</b></h2>                        
                        {(data.data && data.data.Volunteer) &&
                        <div className="volunteerthings">
                             <div className="imagevolunteer">
                                <Avatar src={"http://localhost:5000/" + (data.data.Volunteer.foto)} size={140} style={{backgroundColor:"purple"}} ><span style={{fontSize:"50px"}}>{data.data.Volunteer.name[0].toUpperCase()}</span></Avatar>                               
                            </div>
                            <div className="infovolunteer">
                                <h5 className="compename"><b>{data.data.Volunteer.name}</b></h5>                                                              
                                <p class="text-muted">{data.data.Volunteer.role === 3 ? "Therapist" : "Arthist"}</p>
                                <p style={{textAlign: "center"}}>{data.data.Volunteer.description && <>" {data.data.Volunteer.description} "</>}</p>
                            </div>
                        </div>
                           }
                    </div></Link>
                    <Link style={{textDecoration: "none", color: "black"}} to="/about/support"><div className='wsbadges'>
                        <h2><b>Competency you will get:</b></h2>
                        {(data.data && data.data.Competency) &&
                        <>
                            <p className="compename">{data.data.Competency.name }</p>
                            <p>{data.data.Competency.description}</p>
                           
                            </>}
                    </div> </Link>
                    
                    <div className='wsclients'>
                        <h2><b>Participants:</b></h2>
                          {data.data && data.data.Users && data.data.Users.length ? 
                          <div className="avatarsv">
                        <Avatar.Group maxCount={2} size={50} maxStyle={{ color: 'white', backgroundColor: '#f5d389', cursor: 'pointer' }}>
                            {Clients2}
                        </Avatar.Group>
                        </div>
                        : <p>There are no users participating at the moment.</p>}
                        {/* {token ? <ul>{Clients}</ul> : 
                        <>
                        <p>If you want to see more, please:</p>
                        <div className="buttonparticipant"><Link to="/signSelect"><Button>Log in</Button></Link> or <Link to="/register"><Button>Register</Button></Link></div>
                        </>} */}
                    </div>
                    
                </div>
            </div>
            <br />
            <br />

        </>
    );
}

export default IndService;
