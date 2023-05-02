import './App.css'
import { Routes, Route, useNavigate } from "react-router-dom";
import { Container, ToastContainer, Toast} from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import {useState, useEffect} from 'react';
import GlobalContext from './GlobalContext';
import API_URL from './apiconfig';

import Menu from './Menu';
import Footer from './Footer';
import ButtonUp from './ButtonUp';
import Home from './components/Home';
import Services from './components/Services';
import Register from './components/Register';
import Sign from './components/Sign';
import SignSelect from './components/SignSelect';
import Mission from './components/about/Mission';
import Support from './components/about/Support';
import IndService from './components/IndService';
import Perfil from './components/Perfil/Perfil';

function App() {

  const [token, setToken] = useState();
  const [id, setId] = useState();
  const [type, setType] = useState();
  const [username, setUsername] = useState('');
  const [expired, setExpired] = useState();
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const navigateTo = useNavigate();
  const goHome = () => {
    navigateTo('/')
  }
  const goServices = () => {
    navigateTo('/services')
  }

  useEffect(()=>{
    if(token) {
      const decoded = jwt_decode(token) //para poder extraer los datos del token
      if(decoded.role){
        setType("volunteers")
      } else if(decoded.record){
        setType("users")
      }else{setType("tutor")};
      setEmail(decoded.email);
      setUsername(decoded.name || decoded.email);
      setExpired(decoded.expiredAt);
      setId(decoded.id);
      goServices();
    } else {
      const now = new Date().getTime()
      setShowToast(now > expired);
      if(now > expired)
        localStorage.removeItem('women_access_token');      
      setUsername('');
      goHome();
    }    
  }, [token])

  const logout = () => {
    localStorage.removeItem('women_access_token');
    setToken('');
    goHome();
  }

  useEffect(()=>{
    const localToken = localStorage.getItem('women_access_token')
    if (localToken){
      const decoded = jwt_decode(localToken)
      const now = new Date().getTime()
      if(now > decoded.expiredAt){
        localStorage.removeItem('women_access_token');
        logout() 
      }
      setToken(localToken)
    }
  },[])
  
  //definimos aqui el handlelogin porque es el que me da el token en un primer momento y lo necesito pasar a toda la aplicacion como GlobalContext
  const handleLogin = (email, password, position) => {
    const requestedOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    };
    fetch(API_URL + position + "/login", requestedOptions)
      .then(res => res.json())
      .then(res => {
        if(res.ok){
          setToken(res.token);
          localStorage.setItem('women_access_token', res.token);
        } else {
          setError(res.msg);
        }
      })
      .catch(error => setError(error))
  };


  return (
    <GlobalContext.Provider value={{token, logout, error, username, email, setEmail, id, type, setToken}}>  
    <div className="ContainerPage">
        <Menu />  
        
          <Routes>
            <Route path="/" element={<Home />} />           
            <Route path="/about/mission" element={<Mission />} />
            <Route path="/about/support" element={<Support />} />
            <Route path="/services" element={<Services />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sign/:position" element={<Sign handleLogin={handleLogin} />} />
            <Route path="/signSelect" element={<SignSelect />} />
            <Route path="/perfil/:type/:id" element={<Perfil />} />
            <Route path="/indService" element={<IndService />} />


          </Routes>
        <ToastContainer className="p-3" position={'top-center'}>
          <Toast show={showToast} onClose={()=> setShowToast(false)}>
            <Toast.Header >
              <strong className="me-auto">WOMEN</strong>
              <small className="text-muted">just now</small>  
            </Toast.Header>
            <Toast.Body>Your session has expired</Toast.Body>
          </Toast>
        </ToastContainer>

        </div>



        <Footer />

        <ButtonUp />
    </GlobalContext.Provider>
  )
}

export default App
