import React from 'react'
import { useState } from 'react'
import './Tag.css'
const Tag = ({tags,setTags,table}) => {
    const [chip,setChip]=useState('');
    const [loading,setLoading]=useState(false);
    const handleCreateChip=(event)=>{
        if(event.key===' ' || event.key==='Enter'){
          setLoading(true)  
          setTags(tags.concat(',',chip))
          setChip('')
          setLoading(false)
        }
    }
    const handleRemove=(string)=>{
      setLoading(true); 
      setTags(tags.replace(`,${string}`,""));
      setLoading(false);
    }
    const handleChange=(e)=>{
        setChip(e.target.value)
    }
  return (
    <>
    <div className='tag-container'>
    <ul id="tags">
      {!loading && tags?.split(',')?.filter((item)=>(item!==''))?.map((tag,index)=>(<li className='tag' key={index}>
        <div className='tag-title'>{tag}</div>
        {!table &&<div className='tag-close-icon' onClick={()=>handleRemove(tag)}>x</div>}
      </li>))}
    </ul>
      {!table && <input placeholder='Enter For Add Tag' type="text" id='tag' className='tag-input' value={chip} onChange={handleChange} onKeyDown={handleCreateChip} />}  
    </div>
    </>
  )
}

export default Tag