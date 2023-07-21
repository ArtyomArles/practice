import {createSlice} from '@reduxjs/toolkit'

const searchTextSlice = createSlice({
  name: 'searchText',
  initialState: {
    configurationSearchText: '',
    environmentSearchText: '',
    datacenterSearchText: '',
  },
  reducers: {
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
  setConfigurationSearchText,
  setEnvironmentSearchText,
  setDatacenterSearchText
} = searchTextSlice.actions
export default searchTextSlice.reducer