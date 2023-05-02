import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import API_URL from '../apiconfig';
import GlobalContext from '../GlobalContext';
import './IndService.css'

function IndService() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { token } = useContext(GlobalContext)

    useEffect(() => {

        fetch(API_URL + `services/` + id, {
            headers: { 'Content-Type': 'application/json', authorization: token }
        })
            .then((response) => response.json())
            .then((data) => setData(data));
    }, [id]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='wholepage'>
                <div className='infoservice'>
                    <img className='wsimg' src="https://placekitten.com/300/150" />
                    <h1 className='wsname'>{data.data.name}</h1>
                    <p className='wsdesc'>description: {data.data.description}</p>
                    <p className='wsdata'>date: {data.data.date}</p>
                    <p>At: {data.data.time} h</p>
                    <p>Address: {data.data.address}</p>
                    <Link to="/services" >Back to browse workshops</Link>
                    <br />
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
