import React, { useState } from "react";
// import { Input, Modal, ModalBody, ModalHeader } from "reactstrap";
let baseURL = process.env.REACT_APP_STATIC_URL;

const Step1 = (props) => {
  let { shapeData, onImageSelect } = props;
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = shapeData.filter((item) => {
    return item.shapeCode.toString().includes(searchQuery);
  });
  return (
    <div className="shape-selector">
      <section className="shape-selector-input">
        <input
          className="w-100"
          type="search"
          placeholder="Search Here"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </section>
      <section className="shape-selector-filter-data">
        {filteredData.map((d) => (
          <div key={d.id} className="img-data">
            <img
              width={100}
              height={100}
              src={`${baseURL}/${d.imagePath}`}
              alt="RF Shape Image not rendered"
              className="image-with-pointer"
              onClick={() => {
                onImageSelect(d.id);
              }}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Step1;
