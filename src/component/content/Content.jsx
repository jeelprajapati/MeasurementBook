import React, { useRef, useState } from "react";
import "./Content.css";
import useClickOutside from "../../hooks/useclickOutside.js";

const Content = ({ text, index,min }) => {
  const [show, setShow] = useState({ ClickIndex: index, credential: false });
  const ref = useRef();
  const handleMore = (e) => {
    e.preventDefault();
    setShow({ ClickIndex: index, credential: true });
  };
  const handleLess = (e) => {
    e.preventDefault();
    setShow({ ClickIndex: index, credential: false });
  };

  useClickOutside(ref, () => {
    if (show?.credential) {
      setShow({ ClickIndex: -1, credential: false });
    }
  });
  return (
    <>
      {text?.length > 100 ? (
        <div className="textMaxContainer" ref={ref} style={{minHeight:`${min}px`}}> 
          {show?.credential && show?.ClickIndex === index ? (
            <span className="more">
              {text}.
              <button onClick={handleLess} className="contentButton">
                less
              </button>
            </span>
          ) : (
            <span className="less">
              {text?.slice(0,100)}..
              <button onClick={handleMore} className="contentButton">
                more
              </button>
            </span>
          )}
        </div>
      ) : (
        <span className="textMinContainer">{text}</span>
      )}
    </>
  );
};

export default Content;
