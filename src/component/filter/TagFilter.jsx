import React, { useRef } from "react";
import "./style.css";
import { useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useClickOutside from "../../hooks/useclickOutside";
const TagFilter = ({ item, filter, setFilter }) => {
  const [searchVal, setSearchVal] = useState("");
  const [allFilters, setAllFilters] = useState(false);
  const ref = useRef();
  const handleArray = (e) => {
    if (filter?.find((i) => e.target.value === i)) {
      setFilter(filter.filter((i) => i !== e.target.value));
    } else {
      setFilter([...filter, e.target.value]);
    }
  };
  const handleClose = () => {
    if (allFilters) {
      setAllFilters(false);
    } else {
      setAllFilters(true);
    }
  };

  useClickOutside(ref, () => {
    if (allFilters) {
      setAllFilters(false);
    }
  });

  return (
    <div className="filterContainer" ref={ref}>
      {filter.length !== 0 ? (
        <div className="filterBox1" onClick={handleClose}>
          <span className="w">✓</span>
          <span className="filterName">Tags</span>
          <span className="x">({filter.length})</span>
        </div>
      ) : (
        <div className="filterBox" onClick={handleClose}>
          <span className="filterType">Tags</span>
          <span class="triangleDown"></span>
        </div>
      )}
      {allFilters && (
        <div
          className="filterTable"
          style={{
            width:"200px",
            height: "fitContent",
            maxHeight: "250px",
          }}
        >
          <div className="filterSearch">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              type="text"
              placeholder={`Search For Tags`}
              onChange={(e) => {
                setSearchVal(e.target.value);
              }}
            />
          </div>
          <div
            className="filterItem"
            style={{
              maxHeight: "200px",
              height: "fitContent",
              display: "flex",
              flexWrap: "wrap",
              gap: "5px",
              margin: "5px",
            }}
          >
            {item
              ?.filter((i) => i.toUpperCase().includes(searchVal.toUpperCase()))
              ?.map((i, index) => (
                <div className="Wrapper" key={index}>
                  <input
                    type="checkbox"
                    value={i}
                    onClick={(e) => handleArray(e)}
                    checked={filter.find((e) => e === i)}
                  />
                  <span>{i}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagFilter;
