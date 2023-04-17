import './App.css'
import { Routes, Route } from "react-router-dom";

import Menu from './Menu';

import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Services from './components/Services';
import Join from './components/Join';
import Sign from './components/Sign';
import Badges from './components/about/Badges';
import Impact from './components/about/Impact';
import Mission from './components/about/Mission';
import Story from './components/about/Story';


function App() {

  return (
    <>
        <Menu />

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/mission" element={<Mission />} />
            <Route path="/about/story" element={<Story />} />
            <Route path="/about/impact" element={<Impact />} />
            <Route path="/about/badges" element={<Badges />} />
            <Route path="/services" element={<Services />} />
            <Route path="/join" element={<Join />} />
            <Route path="/sign" element={<Sign />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>

    </>
  )
}

export default App
