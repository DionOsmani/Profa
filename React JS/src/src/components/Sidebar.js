import React from 'react'

import {Link} from 'react-router-dom';

const Sidebar = () => {

  return (
    <div className="sidebar-main-container">
        <div className="sidebar-container">
            <Link className='link link-sidebar' to="/">Home</Link>
            <Link className='link link-sidebar' to="/staff">Staff</Link>
            {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <Link className='link link-sidebar' to="/branches">Branch</Link>}
            {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <Link className='link link-sidebar' to="/departments">Department</Link>}
            {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <Link className='link link-sidebar' to="/bills">Bills</Link>}
            {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <Link className='link link-sidebar' to="/customers">Customers</Link>}
            {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <Link className='link link-sidebar' to="/extraHour">Extra Hours</Link>}
            {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <Link className='link link-sidebar' to="/issue">Issues</Link>}
            {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <Link className='link link-sidebar' to="/machinery">Machinery</Link>}
            {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <Link className='link link-sidebar' to="/materials">Materials</Link>}
            {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <Link className='link link-sidebar' to="/reports">Reports</Link>}
            {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <Link className='link link-sidebar' to="/staffPayments">Staff Payments</Link>}
            {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <Link className='link link-sidebar' to="/tools">Tools</Link>}
            {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <Link className='link link-sidebar' to="/woods">Woods</Link>}
            {localStorage.getItem('token') && localStorage.getItem('Role')=="Admin" && <Link className='link link-sidebar' to="/complaints">Complaints</Link>}
            <Link className='link link-sidebar' to="/products">Product</Link>
            
        </div>
    </div>

  )
}

export default Sidebar