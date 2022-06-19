import React from 'react'

import {Link} from 'react-router-dom';

const Sidebar = () => {

  return (
    <div className="sidebar-main-container">
        <div className="sidebar-container">
            <Link className='link link-sidebar' to="/">Home</Link>
            <Link className='link link-sidebar' to="/staff">Staff</Link>
            <Link className='link link-sidebar' to="/branches">Branch</Link>
            <Link className='link link-sidebar' to="/departments">Department</Link>
            <Link className='link link-sidebar' to="/products">Product</Link>
        </div>
    </div>

  )
}

export default Sidebar