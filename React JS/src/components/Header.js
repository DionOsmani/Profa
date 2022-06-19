import React from 'react'
import {Link} from 'react-router-dom';
import logo from './../assets/logo.png'

const Header = () => {

  return (
    <header className='d-flex header'>
        <img className='mt-2' src={logo} alt={"png"}  width={"140"} height={"50"}/>
        <Link className='ms-auto my-auto' style={{textDecoration: 'none'}} to="/login">
        {!localStorage.getItem('token') && <button className='btn btn-outline-primary login-btn px-4'>Log In</button>}
        </Link>
        {localStorage.getItem('token') && <button onClick={LogOut} className='ms-auto my-auto btn btn-outline-primary login-btn px-4'>Log Out</button>}

    </header>
  )
  function LogOut(){
    localStorage.clear()
    window.location.href="/login"
  }
}

export default Header