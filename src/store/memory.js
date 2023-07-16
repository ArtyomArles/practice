import {createSlice} from '@reduxjs/toolkit'

const memorySlice = createSlice({
  name: 'memory',
  initialState: {
    menuKeyPath: [],
    menuCollapsed: false,
    filtersCollapsed: {display: 'none'},
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
      if (state.filtersCollapsed === undefined) {
        state.filtersCollapsed = {display: 'flex'}
      } else if (state.filtersCollapsed.display === 'flex') {
        state.filtersCollapsed.display = 'none'
      } else {
        state.filtersCollapsed.display = 'flex'
      }
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