import { createStore } from 'redux';

interface AppState {
  userId: string | null;
}

const initialState: AppState = {
  userId: null,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_USER_ID':
      return { ...state, userId: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
