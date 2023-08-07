import React, { useState } from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom';
const Sidebar = ({id}) => {
  const[clickId,setClickId]=useState(id);
 

  return (
    <div>
      <div className="side-container">
          <ul>
            <Link className='link' to='/'><li className={`${clickId===1&&'lightGray'}`}>Dashboard</li></Link>
            <Link className='link' to='/project'><li className={`${clickId===2&&'lightGray'}`}>Projects</li></Link>
            <Link className='link' to='/client'><li className={`${clickId===3&&'lightGray'}`}>Clients</li></Link>
            <Link className='link' to='/'><li className={`${clickId===4&&'lightGray'}`}>Tutorials</li></Link>
          </ul>
      </div>
    </div>
  )
}

export default Sidebar
