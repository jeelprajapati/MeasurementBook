import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
const Navbar = () => {
  const [token,setToken]=useState(null)
  const Id=localStorage.getItem('organizationId');
  useEffect(()=>{
    setToken(localStorage.getItem('token'))
  })
  const navigate=useNavigate()
  const handleLogout=(e)=>{
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('organizationId');
    navigate('/login')
  }
  return (
    <div>
      <div className="nav-container">
        <div className="nav-left">
           <div className="nav-logo">
             <span>MB</span>
           </div>
           <div className="nav-title">
            measurement book
           </div>
        </div>
        <div className="nav-right">
          {(Id && token)?<span onClick={handleLogout}>Logout</span>:<><Link to={'/login'} className='link'><span>Login</span></Link>
           <span> / </span>
           <Link to={'/register'} className='link'><span>Register</span></Link></>}
           
        </div>
      </div>
    </div>
  )
}

export default Navbar
