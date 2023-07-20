import {createSlice} from '@reduxjs/toolkit'

const storedSelectedDirectorySlice = createSlice({
  name: 'storedSelectedDirectory',
  initialState: {
    id: null,
    code: '',
    title: '',
    description: '',
    key: null
  },
  reducers: {
    setStoredSelectedDirectory(state, action) {
      state.id = action.payload.id
      state.code = action.payload.code
      state.title = action.payload.title
      state.description = action.payload.description
    }
  }
})

export const {
  setStoredSelectedDirectory
} = storedSelectedDirectorySlice.actions
export default storedSelectedDirectorySlice.reducer