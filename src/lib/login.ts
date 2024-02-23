import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'userId',
  initialState: {
    value: null,
  },
  reducers: {
    setUserId: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUserId } = loginSlice.actions;

export default loginSlice.reducer;