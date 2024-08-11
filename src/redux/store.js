import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from './slice/sidebarSlice.js'
import tagReducer from './slice/tagSlice.js'
import contractItemReducer from './slice/contractItemSlice.js'

export const store = configureStore({
  reducer: {
    sidebarToggle:sidebarReducer,
    tags:tagReducer,
    contractItem:contractItemReducer
  },
})