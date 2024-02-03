import React, { useState, useRef, useEffect } from "react";
import "./select.css";
import {
  faAngleDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useClickOutside from "../../hooks/useclickOutside";

const Select = ({ onChange, options, value, error }) => {
  const [searchTerm, setSearchTerm] = useState(value?.label);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const inputRef = useRef();

  useEffect(()=>{
    setFilteredOptions(()=>options);
  },[options])

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filteredOptions = options.filter((option) =>
      option?.label.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  };
  const handleSelectOption = (option) => {
    setSearchTerm(option?.label);
    onChange(option);
  };

  const handleOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
      focusInput();
    }
  };

  useClickOutside(ref, () => {
    if (open) {
      setOpen(false);
    }
  });

  return (
    <div
      ref={ref}
      className={`${
        open
          ? "searchableDropdown maxwidth"
          : error
          ? "searchableDropdown minwidth warning"
          : "searchableDropdown minwidth"
      }`}
      onClick={handleOpen}
    >
      <div className="textInput">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="searchItem" />
        <input
          type="text"
          placeholder="SEARCH ITEM"
          value={searchTerm || ""}
          onChange={handleSearch}
          required
          ref={inputRef}
        />
        <FontAwesomeIcon icon={faAngleDown} style={{ fontSize: "18px" }} />
      </div>
      {open && (
        <ul>
          {filteredOptions.map((option, index) => (
            <li key={index} onClick={() => handleSelectOption(option)}>
              {option?.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
