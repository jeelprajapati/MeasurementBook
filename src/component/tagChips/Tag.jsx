import React from 'react'
import { useState } from 'react'
import './Tag.css'
const Tag = ({tags,setTags,table}) => {
    const [chip,setChip]=useState('');
    const [loading,setLoading]=useState(false);
    const handleCreateChip=(event)=>{
        if(event.key==='Enter'){
          setLoading(true)  
          setTags(tags.concat(',',chip))
          if(!localStorage.getItem('tag')){
            localStorage.setItem('tag',chip);
          }
          else{
            const usedTag=localStorage.getItem('tag');
            localStorage.setItem('tag',usedTag.concat(',',chip))
          }
          setChip('')
          setLoading(false)
        }
    }
    const handleClick=(tag)=>{
      setLoading(true);
      console.log(tag)
      setTags(tags.concat(',',tag));
      setLoading(false);
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
    {!(table && localStorage.getItem('tag')) && <div className='allTag'>
         <div style={{width:'210px'}}>Recent Used Tag. Click For Use It!</div>
        {localStorage.getItem('tag')?.split(',').filter((item)=>(item!=='' && item?.toUpperCase().includes(chip.toUpperCase()))).map((item,index)=>(<p key={index} onClick={()=>handleClick(item)}>{item}</p>))}
    </div>}
    </>
  )
}

export default Tag