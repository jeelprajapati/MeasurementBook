import React, { useEffect, useRef } from 'react'
import './Filter.css'
import search from "../../image/search.svg";
import { useState } from 'react';
const MultiFilter = ({item,type,filter,setFilter,max,min,average}) => {
    const [searchVal,setSearchVal]=useState("");
    const [allFilters, setAllFilters] = useState(false);
    const ref=useRef();
    const handleArray=(e)=>{
       if(filter?.find((i)=>e.target.value===i)){
        setFilter(filter.filter((i)=>(i!==e.target.value)))
       }
       else{
        setFilter([...filter,e.target.value])
       }
    }
    const removeTag=(value)=>{
      setFilter(filter.filter((i)=>(i!==value)))
    }
    const handleClose=()=>{
       if(allFilters){
        setAllFilters(false);
       }
       else{
        setAllFilters(true);
       }
    }

    useEffect(() => {
    const checkIfClickedOutside = e => {
      if (allFilters && ref.current && !ref.current.contains(e.target)) {
        setAllFilters(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [allFilters])

  return (
    <div className="filter-container" ref={ref}>
      {filter.length!==0? (
        <div className="wrapper-box" onClick={handleClose}>
         {filter?.slice(0)?.reverse()?.map((i,index)=>(<div className="tag-filter-box" key={index}>
          <span className="w">✓</span>
          <span className="filter-name" >{i}</span>
          <span className="x"onClick={()=>removeTag(i)} >&times;</span>
         </div>))}
        </div>
      ) : (
        <div className="filter-box" onClick={handleClose} >
          <span className="filter-type">{type}</span>
          <span class="triangle_down"></span>
        </div>
      )}
      {allFilters && (
        <div className="filter-table" style={{minWidth:`${min}px`,maxWidth:`${max}px`,width:`${average}px`,height:'fitContent',maxHeight:'250px'}}>
          <div className="filter-search">
            <img src={search} alt="" className="serch-icon" />
            <input type="text" placeholder={`Search For ${type}`} onChange={(e)=>{setSearchVal(e.target.value)}}/>
          </div>
          <div className="filter-item" style={{maxHeight:'200px',height:'fitContent',display:'flex',flexWrap:'wrap',gap:'5px'}}>
            {item?.filter((i)=>(i.toUpperCase().includes(searchVal.toUpperCase())))?.map((i,index)=>(
            <div className="Wrapper" key={index}>
              <input type="checkbox" value={i} onClick={(e)=>handleArray(e)} checked={filter.find((e)=>(e===i))}/>
              <span>{i}</span>
            </div>))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MultiFilter
