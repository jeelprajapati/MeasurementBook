import React, { useEffect } from "react";
import "./Filter.css";
import search from "../../image/search.svg";
import { useState } from "react";
const Filter = ({type,item,filter,setFilter,filterColumn,max,min,average}) => {
  const [allFilters, setAllFilters] = useState(false);
  const [filterCrud, setFilterCrud] = useState(false);
  const [filterItem, setFilterItem] = useState("");
  const [searchVal,setSearchVal]=useState("");
  useEffect(()=>{
    if(filter.length===0){
      setFilterItem("");
      setSearchVal("")
      setFilterCrud(false);
    }
  },[filter])

  const handleChange=(e)=>{
    setSearchVal(e.target.value);
  }

  const handleClick = () => {
    if (allFilters === false) {
      setAllFilters(true);
    } else {
      setAllFilters(false);
    }
  };

  const handleClose=()=>{
    setFilterItem("");
    setSearchVal("")
    setFilter(filter.filter((item)=>(item?.filterColumn!==filterColumn)))
    setFilterCrud(false);
  }
  
  const handleSelect=(value)=>{
    setFilterItem(value);
      if(filter.length===0){
        setFilter([{"filterColumn":filterColumn,"filterValue":value}])
      }
      else if(filter.length===1){
        if(filter[0]?.filterColumn===filterColumn){
          setFilter([{"filterColumn":filterColumn,"filterValue":value}])
        }
        else{
          setFilter([...filter,{"filterColumn":filterColumn,"filterValue":value}])
        }
      }
      if(filter.length===2){
        const item=filter?.filter((i)=>(i.filterColumn!==filterColumn))
        setFilter([...item,{"filterColumn":filterColumn,"filterValue":value}])
      }
    setAllFilters(false);
    setFilterCrud(true);
  }
  return (
    <div className="filter-container">
      {filterCrud ? (
        <div className="filter-box1">
          <span className="w">✓</span>
          <span className="filter-name" onClick={handleClick}>{filterItem}</span>
          <span className="x" onClick={handleClose}>&times;</span>
        </div>
      ) : (
        <div className="filter-box" onClick={handleClick}>
          <span className="filter-type">{type}</span>
          <span class="triangle_down"></span>
        </div>
      )}
      {allFilters && (
        <div className="filter-table" style={{minWidth:`${min}px`,maxWidth:`${max}px`,width:`${average}px`}}>
          <div className="filter-search">
            <img src={search} alt="" className="serch-icon" />
            <input type="text" placeholder={`Search For ${type}`} onChange={handleChange}/>
          </div>
          {type==="Tags" ? <div className="tags" style={{display:"flex",flexWrap:"wrap",margin:"5px"}}>
            {item?.filter((i)=>(filterColumn===1?i?.item.toUpperCase().includes(searchVal.toUpperCase()):i.toUpperCase().includes(searchVal.toUpperCase()))).map((i)=>(<div className="tag" style={{cursor:"pointer"}} onClick={()=>handleSelect(filterColumn===1?i?.item:i)}>
              {filterColumn===1?i?.item:i}
            </div>))}
            </div>:<div className="filter-item">
            {item?.filter((i)=>(filterColumn===1?i?.item.toUpperCase().includes(searchVal.toUpperCase()):i.toUpperCase().includes(searchVal.toUpperCase()))).map((i)=>(<div className="Fi" onClick={()=>handleSelect(filterColumn===1?i?.item:i)}>
              {filterColumn===1?i?.item:i}
            </div>))}
          </div>}
        </div>
      )}
    </div>
  );
};

export default Filter;
