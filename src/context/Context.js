import React, { createContext, useState } from "react";

export const Context = createContext();
const State = (props) => {
  const [state, setState] = useState(false);
  const [type, setType] = useState(1);
  const [contractItemValues, setContractItemValues] = useState({
    value: "",
    unit: "",
    label: "",
    stdUnit: 0,
    exist: false,
  });

  const toggle = () => {
    setState(!state);
  };

  return (
    <Context.Provider
      value={{
        state,
        toggle,
        type,
        setType,
        contractItemValues,
        setContractItemValues,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
