// store.ts
import { createStore } from 'redux';

// Define the initial state
// interface AppState {
//   userId: string | null;
// }

// const initialState: AppState = {
//   userId: null,
// };

// // Define the reducer function
// const reducer = (state = initialState, action: any) => {
//   switch (action.type) {
//     case 'SET_USER_ID':
//       return { ...state, userId: action.payload };
//     default:
//       return state;
//   }
// };

// // Create the Redux store
// const store = createStore(reducer);

// export default store;

import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {},
})