import React from 'react'
import './Pagination.css'
import rignt from "../../image/arrow.svg"
const Pagination = ({page,setPage,allPage}) => {
  return (
    <div className='pagination-con'>
      <button className='pagination-btn prv' disabled ={page===1} onClick={()=>{setPage(page-1)}}><img src={rignt} alt="" />Previous</button>
      <span>{page} of {allPage}</span>
      <button className='pagination-btn' disabled={allPage===page} onClick={()=>{setPage(page+1)}}>Next <img src={rignt} alt="" /></button>
    </div>
  )
}

export default Pagination
