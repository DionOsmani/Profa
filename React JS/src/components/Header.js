import React from 'react'

import logo from './../assets/logo.png'

const Header = () => {

  return (
    <header className='d-flex header'>
        <img className='mt-2' src={logo} alt={"png"}  width={"140"} height={"50"}/>
    </header>
  )
}

export default Header