import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useClickOutside from "../../hooks/useclickOutside";
const ContractItemFilter = ({ item, filter, setFilter }) => {
  const [allFilters, setAllFilters] = useState(false);
  const [filterCrud, setFilterCrud] = useState(false);
  const [filterItem, setFilterItem] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const ref = useRef();
  useEffect(() => {
    if (filter.length === 0) {
      setFilterItem("");
      setSearchVal("");
      setFilterCrud(false);
    }
  }, [filter]);

  const handleChange = (e) => {
    setSearchVal(e.target.value);
  };

  const handleClick = () => {
    if (allFilters === false) {
      setAllFilters(true);
    } else {
      setAllFilters(false);
    }
  };

  const handleClose = () => {
    setFilterItem("");
    setSearchVal("");
    setFilter([]);
    setFilterCrud(false);
  };

  const handleSelect = (value) => {
    setFilterItem(value);
    if (filter?.find((i) => value === i)) {
      setFilter(filter.filter((i) => i !== value));
    } else {
      setFilter([value]);
    }
    setAllFilters(false);
    setFilterCrud(true);
  };

  useClickOutside(ref, () => {
    if (allFilters) {
      setAllFilters(false);
    }
  });

  return (
    <div className="filterContainer" ref={ref}>
      {filterCrud ? (
        <div className="filterBox1">
          <span className="w">✓</span>
          <span className="filterName" onClick={handleClick}>
            {filterItem?.length >= 50
              ? `${filterItem?.slice(0, 50)}...`
              : filterItem}
          </span>
          <span className="x" onClick={handleClose}>
            <FontAwesomeIcon
              icon={faXmark}
              style={{ fontSize: "18px", fontWeight: "400", color: "gray" }}
            />
          </span>
        </div>
      ) : (
        <div className="filterBox" onClick={handleClick}>
          <span className="filterType">ContractItem</span>
          <span className="triangleDown"></span>
        </div>
      )}
      {allFilters && (
        <div
          className="filterTable"
          style={{
            width: "400px",
            maxHeight: "360px",
            height: "fitContent",
          }}
        >
          <div className="filterSearch">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              type="text"
              placeholder={`Search For ContractItem`}
              onChange={handleChange}
            />
          </div>
          <div className="filterItem">
            {item
              ?.filter((i) =>
                i?.item.toUpperCase().includes(searchVal.toUpperCase())
              )
              ?.map((i) => (
                <div className="Fi" onClick={() => handleSelect(i?.item)}>
                  {i?.item}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractItemFilter;
