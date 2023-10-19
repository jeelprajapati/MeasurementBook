import React, { useEffect } from "react";
import "./Filter.css";
import search from "../../image/search.svg";
import { useState } from "react";
const Filter = ({type,item,filter,setFilter,max,min,average}) => {
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
    setFilter([])
    setFilterCrud(false);
  }
  
  const handleSelect=(value)=>{
    setFilterItem(value);
     if(filter?.find((i)=>value===i)){
      setFilter(filter.filter((i)=>(i!==value)))
     }
     else{
      setFilter([value])
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
          <div className="filter-item">
            {item?.filter((i)=>(i?.item.toUpperCase().includes(searchVal.toUpperCase())))?.map((i)=>(<div className="Fi" onClick={()=>handleSelect(i?.item)}>
              {i?.item}
            </div>))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
