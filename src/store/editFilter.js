import {createSlice} from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filtres',
  initialState: {
    regNumber: '',
    preorderTypeId: null,
    configurationId: null,
    environmentId: null,
    datacenterIds: [],
    isReplication: null,
    statuses: [],
  },
  reducers: {
    setRegNumber(state, action) {
      state.regNumber = action.payload
    },
    setPreorder(state, action) {
      state.preorderTypeId = action.payload
    },
    setConfiguration(state, action) {
      state.configurationId = action.payload
    },
    setEnvironment(state, action) {
      state.environmentId = action.payload
    },
    setDatacenter(state, action) {
      state.datacenterIds = action.payload
    },
    setReplication(state, action) {
      state.isReplication = action.payload
    },
    setStatuses(state, action) {
      state.statuses = action.payload
    },
    clearFilter(state) {
      state.regNumber = ''
      state.preorderTypeId = null
      state.configurationId = null
      state.environmentId = null
      state.datacenterIds = []
      state.isReplication = null
      state.statuses = []
    }
  }
})

export const {
  setRegNumber,
  setPreorder,
  setConfiguration,
  setEnvironment,
  setDatacenter,
  setReplication,
  setStatuses,
  clearFilter
} = filterSlice.actions
export default filterSlice.reducer