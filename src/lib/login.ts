import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'userId',
  initialState: {
    value: 0,
  },
  reducers: {
    addId: (state) => {
      state.value += 1
    },
  },
})
export const { addId } = loginSlice.actions

export default loginSlice.reducer