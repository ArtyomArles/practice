import {createSlice} from '@reduxjs/toolkit'

const storedSelectedPreorderSlice = createSlice({
  name: 'storedSelectedPreorder',
  initialState: {
    regNumber: '',
    preorderTypeId: null,
    configurationId: null,
    environmentId: null,
    datacenterIds: [],
    isReplication: null,
    status: [],
  },
  reducers: {
    setStoredSelectedPreorder(state, action) {
      state.regNumber = action.payload.regNumber
      state.preorderTypeId = action.payload.preorderTypeId
      state.configurationId = action.payload.configurationId
      state.environmentId = action.payload.environmentId
      state.datacenterIds = action.payload.datacenterIds
      state.isReplication = action.payload.isReplication
      state.status = action.payload.status
    }
  }
})

export const {
  setStoredSelectedPreorder
} = storedSelectedPreorderSlice.actions
export default storedSelectedPreorderSlice.reducer