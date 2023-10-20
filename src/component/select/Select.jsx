import React from 'react'
import { useState } from 'react';
import './Select.css'
import Search from '../../image/search.svg'
import Arrow from '../../image/down-arrow.svg'

const Select = ({onChange,options,value,error}) => {
  const [searchTerm, setSearchTerm] = useState(value?.label);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [open,setOpen]=useState(false);
 
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filteredOptions = options.filter(option =>
      option?.label.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  };
  const handleSelectOption = (option) => {
    setSearchTerm(option?.label)
    onChange(option)
  };
  
  const handleOpen=()=>{
    if(open){
        setOpen(false)
    }
    else{
        setOpen(true)
    }
  }
  
  return (
    <div className={`${open ? 'searchable-dropdown maxwidth': error ? 'searchable-dropdown minwidth warning' : 'searchable-dropdown minwidth'}`} onClick={handleOpen}>
      <div className='text-input'>
      <img src={Search} alt="" />  
      <input
        type="text"
        placeholder="SEARCH ITEM"
        value={searchTerm}
        onChange={handleSearch}
      />
      <img src={Arrow} alt="" />
      </div>  
      {open && <ul onBlur={()=>setOpen(false)}>
        {filteredOptions.map((option, index) => (
          <li key={index} onClick={() => handleSelectOption(option)}>
            {option?.label}
          </li>
        ))}
      </ul>}
    </div>
  )
}

export default Select
