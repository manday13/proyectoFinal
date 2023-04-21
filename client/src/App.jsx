import './App.css'
import { Routes, Route } from "react-router-dom";
import {Container} from "react-bootstrap"

import Menu from './Menu';
import Footer from './Footer';
import ButtonUp from './ButtonUp';
import Home from './components/Home';
import Services from './components/Services';
import Register from './components/Register';
import Sign from './components/Sign';
import Mission from './components/about/Mission';
import Support from './components/about/Support';



function App() {

  return (
    <>  
    <div className="ContainerPage">
        <Menu />  
        
          <Routes>
            <Route path="/" element={<Home />} />           
            <Route path="/about/mission" element={<Mission />} />
            <Route path="/about/support" element={<Support />} />
            <Route path="/services" element={<Services />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sign" element={<Sign />} />

          </Routes>
        </div>



        <Footer />

        <ButtonUp />
    </>
  )
}

export default App
