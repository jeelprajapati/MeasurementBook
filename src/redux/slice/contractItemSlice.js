import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contractItem: {
    value: "",
    unit: "",
    label: "",
    stdUnit: 0,
    exist: false,
  },
};

export const contractItemSlice = createSlice({
  name: "contractItem",
  initialState,
  reducers: {
    addcontractItem: (state,actions) => {
      return {
        contractItem:{
            ...actions.payload.item
        }
      }
    },
    setInitialState:()=>{
        return{
            ...initialState
        }
    }
  },
});

export const { addcontractItem,setInitialState } = contractItemSlice.actions;

export default contractItemSlice.reducer;
