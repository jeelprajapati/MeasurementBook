import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  credential: false,
}

export const sidebarSlice = createSlice({
  name: 'sidebarToggle',
  initialState,
  reducers: {
    toggle: (state) => {
      state.credential=!state.credential;
    }
  },
})

export const { toggle } = sidebarSlice.actions

export default sidebarSlice.reducer