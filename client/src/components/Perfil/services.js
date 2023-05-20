
import {API_URL, IMG_URL} from '../../apiconfig';

export const getUser = (token, type, id) =>{
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' , authorization: token }
    };
    return fetch(API_URL + type + "/" + id, requestOptions)
            .then(res =>   res.json() )
            .catch(error =>error)
    }
