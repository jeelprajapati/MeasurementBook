import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open:false
  }

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setOpen: (state) => {
      state.open=(!state.open);
    }
  },
})

export const { setOpen } = sidebarSlice.actions

export default sidebarSlice.reducer