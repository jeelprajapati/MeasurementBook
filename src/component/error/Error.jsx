import React from "react";

const Error = ({ error, touch }) => {
  return <>{touch && error ? <p style={{ margin: 0 ,color:'red',fontFamily:'Inter',fontSize:'12px'}}>{error}</p> : null}</>;
};

export default Error;
