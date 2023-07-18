import {createSlice} from '@reduxjs/toolkit'

const memorySlice = createSlice({
  name: 'memory',
  initialState: {
    menuKeyPath: [],
    menuCollapsed: false,
    filtersCollapsed: false,
    paginationPerPage: 10
  },
  reducers: {
    setKey(state, action) {
      state.menuKeyPath = action.payload
    },
    editMenuCollapsed(state) {
      state.menuCollapsed = !state.menuCollapsed
    },
    editFiltersCollapsed(state) {
      state.filtersCollapsed = !state.filtersCollapsed
    },
    setPaginationPerPage(state, action) {
      state.paginationPerPage = action.payload
    }
  }
})

export const {
  setKey,
  editMenuCollapsed,
  editFiltersCollapsed,
  setPaginationPerPage
} = memorySlice.actions
export default memorySlice.reducer