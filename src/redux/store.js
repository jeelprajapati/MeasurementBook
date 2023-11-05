import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from './slice/sidebarSlice.js'

export const store = configureStore({
  reducer: {
    sidebar:sidebarReducer
},
})