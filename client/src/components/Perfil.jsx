import {useContext, useEffect, useState} from 'react';
import GlobalContext from "../GlobalContext";
import API_URL from '../apiconfig';


function Perfil(){
    const {id, setToken, token} = useContext(GlobalContext);
    const [refresh, setRefresh] = useState(true);
    const [error, setError] = useState('');
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);
    const [imagen, setImagen] = useState();
    const [nombre, setNombre] = useState();
    const [email,setEmail] = useState();

    useEffect(()=>{
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', authorization: token}
        };
        if(refresh){
            fetch(API_URL + "users/" + id, requestOptions)
                .then(res => res.json())
                .catch(error => error)
                .then((res) => {
                    if (res.ok === true){
                        setUser(res.data);
                    } else{
                        setToken(null)
                        setError(res.error)
                    }
                })
                .catch((err)=>setError(err))
                .finally(()=> setRefresh(!refresh))
        }
    }, [refresh])

    return(
        <>
        <h1>{user.name}</h1>
        <h2>{user.email}</h2>
        </>
    )
}

export default Perfil;