import React from 'react'
import './Warning.css'

const Warning = ({setIsDelete,setWarn}) => {
  return (
    <div className='warn-container'>
      <div className="Warn-title">
        Delete
      </div>
      <div className="warn-massage">
        Are you sure, you want delete this?
      </div>
      <div className="warn-button">
        <button className="warn-btn cancle" onClick={()=>{setIsDelete(false);setWarn(false)}}>
          cancle
        </button>
        <button className="warn-btn red" onClick={()=>setIsDelete(true)} >Delete</button>
      </div>
    </div>
  )
}

export default Warning
