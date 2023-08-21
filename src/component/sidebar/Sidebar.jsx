import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import dashboard from '../../image/dashboard.svg'
import layer from '../../image/layer.svg'
import clientsvg from '../../image/clients.svg'
import tutorial from '../../image/tutorial.svg'
import logout from '../../image/logout.svg'
import rightarrow from '../../image/right-arrow.svg'
import leftarrow from '../../image/left-arrow.svg'
import { Link, useNavigate } from 'react-router-dom';
const Sidebar = ({id}) => {
  const [clickId,setClickId]=useState(id);
  const [sidebar,setSidebar]=useState(false);
  const [token,setToken]=useState(null)

  const handleClick=(e)=>{
    e.preventDefault();
    if(sidebar){
      setSidebar(false)
    }
    else{
      setSidebar(true)
    }
  }

  const Id=localStorage.getItem('organizationId');
  useEffect(()=>{
    setToken(localStorage.getItem('token'))
  },[])
  const navigate=useNavigate()
  const handleLogout=(e)=>{
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('organizationId');
    setToken(localStorage.getItem('token'))
    navigate('/login')
  }

  return (
    <div className='sidebar-main-container'>
      <div className={`${sidebar?'side-container':'side-less-container'}`}>
          <ul className='sidebar-ul'>
            <li style={{position:'relative'}}>
              <div className="nav-logo">
                <span>MB</span>
                </div>
                {sidebar&&<div className="nav-title" style={{margin:'0 10px'}}>
                  measurement book
                </div>}
                {sidebar?<span onClick={handleClick} style={{position:'absolute',top:'21px',width:'18px',height:'18px',right:'-12px',borderRadius:'50%',backgroundColor:'purple'}}><img src={leftarrow} alt="" /></span>:<span onClick={handleClick} style={{position:'absolute',top:'21px',width:'18px',height:'18px',right:'-10px',borderRadius:'50%',backgroundColor:'purple'}}><img src={rightarrow} alt="" /></span>}
            </li>
            <Link className='link' to='/'><li className={`${clickId===1&&'lightGray'}`}>
              <span className='sidebar-svg' ><img src={dashboard} alt="" /></span>
              <span style={{padding:'12px 4px'}} className={`${sidebar?'sidebar-name':'d-none'}`}>Dashboard</span>
            </li></Link>
            <Link className='link' to='/project'><li className={`${clickId===2&&'lightGray'}`}>
              <span className='sidebar-svg'><img src={layer} alt="" /></span>
              <span className={`${sidebar?'sidebar-name':'d-none'}`}>Projects</span>
            </li></Link>
            <Link className='link' to='/client'><li className={`${clickId===3&&'lightGray'}`}>
              <span className='sidebar-svg'><img src={clientsvg} alt="" /></span>
              <span  className={`${sidebar?'sidebar-name':'d-none'}`}>Clients</span>
            </li></Link>
            <Link className='link' to='/'><li className={`${clickId===4&&'lightGray'}`}>
              <span className='sidebar-svg'><img src={tutorial} alt="" /></span>
              <span className={`${sidebar?'sidebar-name':'d-none'}`}>Tutorials</span>
            </li></Link>
          </ul>
      </div>
      {(Id && token)&&<div style={{cursor:'pointer'}} className={!sidebar?'logout':'logout-high'} onClick={handleLogout}>
        <span style={{display:'flex',justifyContent:'center'}} className='sidebar-svg'><img src={logout} alt="" /></span>
        <span style={{color:'white'}} className={`${sidebar?'sidebar-name':'d-none'}`}>Logout</span>
      </div>}
    </div>
  )
}

export default Sidebar
