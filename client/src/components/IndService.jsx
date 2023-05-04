import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import API_URL from '../apiconfig';
import GlobalContext from '../GlobalContext';
import { Button } from 'react-bootstrap';
import './IndService.css'

function IndService() {
    const { ids } = useParams();
    const [data, setData] = useState(null);
    const [ableButton, setAbleButton] = useState(false);
    const { token, id } = useContext(GlobalContext)

    useEffect(() => {

        fetch(API_URL + `services/` + ids, {
            headers: { 'Content-Type': 'application/json', authorization: token }
        })
            .then((response) => response.json())
            .then((data) => setData(data));
    }, [ids]);

    if (!data) {
        return <div>Loading...</div>;
    }

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
                    <h1 className='wsname'>{data.data && data.data.name}</h1>
                    <p className='wsdesc'>description: {data.data && data.data.description}</p>
                    <p className='wsdata'>date: {data.data && data.data.date}</p>
                    <p>At: {data.data && data.data.time} h</p>
                    <p>Address: {data.data && data.data.address}</p>
                    <Link to="/services" >Back to browse workshops</Link>
                    <br />
                    <Button variant="primary" disabled={ableButton} onClick={()=>{participate; setAbleButton(true)}}>Participate</Button>
                </div>
                <div className='side'>
                    <div className='wsclients'>
                        <h2>Participants:</h2>
                    </div>
                    <div className='wsbadges'>
                        <h2>Badges you will get:</h2>
                    </div>
                </div>
            </div>
            <br />
            <br />

        </>
    );
}

export default IndService;
