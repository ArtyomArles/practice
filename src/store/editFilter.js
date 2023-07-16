import {createSlice} from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filter: {
      regNumber: '',
      preorderTypeId: null,
      configurationId: null,
      environmentId: null,
      datacenterIds: [],
      isReplication: null,
      statuses: []
    },
    configurationSearchText: '',
    environmentSearchText: '',
    datacenterSearchText: '',
    menuKeyPath: ['']
  },
  reducers: {
    setRegNumber(state, action) {
      state.filter.regNumber = action.payload
    },
    setPreorder(state, action) {
      state.filter.preorderTypeId = action.payload
    },
    setConfiguration(state, action) {
      state.filter.configurationId = action.payload
    },
    setEnvironment(state, action) {
      state.filter.environmentId = action.payload
    },
    setDatacenter(state, action) {
      state.filter.datacenterIds = action.payload
    },
    setReplication(state, action) {
      state.filter.isReplication = action.payload
    },
    setStatuses(state, action) {
      state.filter.statuses = action.payload
    },
    clearFilter(state) {
      state.filter = {
        regNumber: '',
        preorderTypeId: null,
        configurationId: null,
        environmentId: null,
        datacenterIds: [],
        isReplication: null,
        statuses: []
      }
    },
    setConfigurationSearchText(state, action) {
      state.configurationSearchText = action.payload
    },
    setEnvironmentSearchText(state, action) {
      state.environmentSearchText = action.payload
    },
    setDatacenterSearchText(state, action) {
      state.datacenterSearchText = action.payload
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
  clearFilter,
  setConfigurationSearchText,
  setEnvironmentSearchText,
  setDatacenterSearchText,
} = filterSlice.actions
export default filterSlice.reducer