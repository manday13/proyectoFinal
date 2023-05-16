import React from 'react'
import './Signselect.css'
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import { useEffect } from 'react';

function Signselect() {
  //NO FUNCIONA Y NO SE VER PORQUE
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("el useffect funciona, no lo otro");
  }, []);

  return (
    <>

      <div className='sign_selection'>
        <div className='sign_client'>
          <h4><b>Log in as a client</b></h4>
          <br />
          <Link to="/Sign/users"><Avatar src="../public/client.jpg" round={true} size="300" /></Link>
          <br />
          <br />
          <p>If you signed up as a client, you can access your profile from <Link to="/Sign/users">here</Link></p>
        </div>
        <div className='sign_volunteer'>
          <h4><b>Log in as a volunteer</b></h4>
          <br />
          <Link to="/Sign/volunteers"><Avatar src="../public/volunteer.jfif" round={true} size="300" /></Link>
          <br />
          <br />
          <p>If you signed up as a volunteer, you can access your profile from <Link to="/Sign/volunteers">here</Link></p>
        </div>
        <div className='sign_tutor'>
          <h4><b>Log in as a tutor</b></h4>
          <br />
          <Link to="/Sign/tutor"><Avatar src="../public/tutor.jpg" round={true} size="300" /></Link>
          <br />
          <br />
          <p>If you signed up as a tutor, you can access your profile from <Link to="/Sign/tutor">here</Link></p>
        </div>
      </div>


      <hr className='separator' />
      <p className='separator_par'>You don't have an account?   <span style={{ marginLeft: "5px" }}><Link to="/Register" > Register here</Link></span></p>
      <hr className='separator' />
      <br />
      <br />
      <br />
    </>
  )
}

export default Signselect;
