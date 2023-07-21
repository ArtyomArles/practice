import {createSlice} from '@reduxjs/toolkit'
import {PreorderTypes, Configurations, Environments, Datacenters} from '../data'

const memorySlice = createSlice({
  name: 'memory',
  initialState: {
    menuKeyPath: [],
    menuCollapsed: false,
    filtersCollapsed: false,
    paginationPerPage: 10,
    modalActive: false,
    PreorderTypes,
    Configurations,
    Environments,
    Datacenters
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
    },
    setModalActive(state) {
      state.modalActive = !state.modalActive
    }
  }
})

export const {
  setKey,
  editMenuCollapsed,
  editFiltersCollapsed,
  setPaginationPerPage,
  setModalActive
} = memorySlice.actions
export default memorySlice.reducer