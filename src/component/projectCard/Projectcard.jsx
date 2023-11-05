import React, { useState, useRef, useEffect } from 'react'
import './Projectcard.css'
import move from '../../image/Vector.svg'
import edit from '../../image/edit2.svg'
import report from '../../image/report.svg'
import { Link } from 'react-router-dom'
const Projectcard = ({item}) => {
    const [open,setOpen]=useState(false);
    const ref=useRef();

    useEffect(() => {
        const checkIfClickedOutside = e => {
          if (open && ref.current && !ref.current.contains(e.target)) {
            setOpen(false)
          }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
    
        return () => {
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
      }, [open])
    
  return (
    <div className='projectcard-con'>
      <div className="projectcard-sub1" ref={ref}>
        <div className="dot-list" onClick={()=>{open ? setOpen(false):setOpen(true)}}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        {open && <div className="list-item">
            <div className="item-name-img">
                <img src={edit} alt="" />
                <span>Edit</span>
            </div>
            <div className="item-name-img">
                <img src={report} alt="" />
                <span>Reports</span>
            </div>
        </div>}
      </div>
      <div className="projectcard-sub2">
        <div className="projectcard-top">
            <h3>{item?.projectName?.length>23 ? `${item?.projectName?.slice(0,24)}..` : item?.projectName}</h3>
            <div className="projectcard-desc">
                AGC at uelarn to cequcem, aerae, & ceseresn
            </div>
        </div>
        <div className="label-value">
            <div className="projectcard-label">Project Value</div>
            <div className="projectcard-value">₹ 1,01,51,621</div>
        </div>
        <div className="label-value">
            <div className="projectcard-label">Executed Value</div>
            <div className="projectcard-value">₹ 90,12,451</div>
        </div>
        <div className="projectcard-button">
            <Link to={`/project/${item?.id}`} className='link' style={{width:'100%'}}>
            <button>
             Work on project
             {/* <img src={move} alt=''/>  */}
            </button>
            </Link>   
        </div>
      </div>
    </div>
  )
}

export default Projectcard
