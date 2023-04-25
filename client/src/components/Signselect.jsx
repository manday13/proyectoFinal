import React from 'react'
import './Signselect.css'
import { Link } from 'react-router-dom';


export default function Signselect() {
  return (
    <>
        
        <div className='sign_selection'>
          <div className='sign_client'>
          <p><b>Log in as a client</b></p>
          <br/>
          <Link to="/Sign/users"><img className='signImg' src="../public/client.jpg" alt="client" /></Link>
          <br/>
          <br/>
          <p>If you signed up as a client, you can access your profile from <Link to="/Sign/users">here</Link></p>
          </div>
          <div className='sign_volunteer'>
            <p><b>Log in as a volunteer</b></p>
            <br/>
            <Link to="/Sign/volunteers"><img className='signImg' src="../public/volunteer.jfif" alt="" /></Link>
            <br/>
          <br/>
          <p>If you signed up as a volunteer, you can access your profile from <Link to="/Sign/volunteers">here</Link></p>
          </div>
          <div className='sign_tutor'>
            <p><b>Log in as a tutor</b></p>
            <br/>
            <Link to="/Sign/tutor"><img className='signImg' src="../public/tutor.jpg" alt="" /></Link>
            <br/>
          <br/>
          <p>If you signed up as a tutor, you can access your profile from <Link to="/Sign/tutor">here</Link></p>
          </div>
        </div>                
        <br/>
        <br/>
        <br/>
        <br/>        
        <hr className='separator'/>        
        <p className='separator_par'>You don't have an account?   <span style={{marginLeft:"5px"}}><Link to="/Register" > Register here</Link></span></p>        
        <hr className='separator'/>
        <br/>
        <br/>
        <br/>
    </>
  )
}
