// // store.ts
// import { createStore } from 'redux';

// // Define the initial state
// // interface AppState {
// //   userId: string | null;
// // }

// // const initialState: AppState = {
// //   userId: null,
// // };

// // // Define the reducer function
// // const reducer = (state = initialState, action: any) => {
// //   switch (action.type) {
// //     case 'SET_USER_ID':
// //       return { ...state, userId: action.payload };
// //     default:
// //       return state;
// //   }
// // };

// // // Create the Redux store
// // const store = createStore(reducer);

// // export default store;

// 'use client'
// import { configureStore } from '@reduxjs/toolkit'
// import { loginSlice } from './login';

// export default configureStore({
//     reducer: {
//       userId: loginSlice.reducer
//   },
// })