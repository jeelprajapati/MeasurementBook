import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tags: [],
};

export const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    addTags: (state, actions) => {
      state.tags = actions.payload.tags;
    },
  },
});

export const { addTags } = tagSlice.actions;

export default tagSlice.reducer;
