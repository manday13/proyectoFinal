import './App.css'
import { Routes, Route } from "react-router-dom";
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
import Signselect from './components/Signselect';
import Mission from './components/about/Mission';
import Support from './components/about/Support';




function App() {

  const [token, setToken] = useState();

  return (
    <GlobalContext.Provider value={{token}}>  
    <div className="ContainerPage">
        <Menu />  
        
          <Routes>
            <Route path="/" element={<Home />} />           
            <Route path="/about/mission" element={<Mission />} />
            <Route path="/about/support" element={<Support />} />
            <Route path="/services" element={<Services />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sign/:position" element={<Sign />} />
            <Route path="/signselect" element={<Signselect />} />


          </Routes>
        </div>



        <Footer />

        <ButtonUp />
    </GlobalContext.Provider>
  )
}

export default App
