import React, { useRef, useState } from "react";
import "./tag.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useClickOutside from "../../hooks/useclickOutside.js";
import useFetch from "../../hooks/useFetch.js";
const Tag = ({ tags, dispatch, projectId }) => {
  const ref = useRef();
  const tagRef = useRef();
  const [chip, setChip] = useState("");
  const [open, setOpen] = useState(false);
  const colors = ["blue", "pink", "green", "orange"];
  const { loding, data } = useFetch({url:`MeasurementBook/GetTagsByProjectId?projectId=${projectId}`,change:0})
  // close used tag box when outside click of box
  useClickOutside(tagRef, () => {
    if (open) {
      setOpen(false);
    }
  });

  // focus on input when user click in writeTag class container
  const focusInput = () => {
    if (ref.current) {
      ref.current.focus();
    }
    if (!open) {
      setOpen(true);
    }
  };

  const handleChange = (e) => {
    setChip(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch({
        type: "ADD_TAG",
        payload: { tag: chip },
      });
      setChip("");
    }
  };

  const removeTag = (tag) => {
    dispatch({
      type: "REMOVE_TAG",
      payload: { tag },
    });
  };

  const addTag= (tag) =>{
    dispatch({
      type: "ADD_TAG",
      payload: { tag },
    });
  }
  return (
    <div className="wrapperContainer">
      <div className="tagContainer" ref={tagRef}>
        <div className="writeTag" onClick={focusInput}>
          <ul>
            {tags?.map((tag, index) => (
              <li key={index} className={`${colors[index % 4]}`}>
                <span className="chipName">{tag}</span>
                <span className="tagIcon" onClick={() => removeTag(tag)}>
                  <FontAwesomeIcon icon={faXmark} />
                </span>
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={chip}
            onChange={handleChange}
            ref={ref}
            placeholder="Add tag"
            onKeyDown={handleKeyDown}
          />
        </div>
        {open && (
          <div className="usedTagContainer">
            <div className="usedTag">
              <span>Select an option or create one</span>
              <div className="allUsedTagChip">
                {!loding && data?.map((tag,index)=>(<div key={index} onClick={()=>addTag(tag)} className={`${colors[index % 4]}`}>{tag}</div>))}
              </div>
            </div>
            <div className="create">
              <span>Create</span>
              {chip !== "" && <span className={`tagChip ${colors[tags.length % 4]}`}>{chip}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tag;
