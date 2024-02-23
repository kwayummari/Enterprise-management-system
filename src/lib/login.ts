import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'userId',
  initialState: {
    value: null, // Change initial value to null or any other appropriate value
  },
  reducers: {
    setUserId: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUserId } = loginSlice.actions;

export default loginSlice.reducer;