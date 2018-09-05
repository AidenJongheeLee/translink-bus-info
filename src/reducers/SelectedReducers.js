import { SELECT_STOP } from '../actions/types';

const INITIAL_STATE = {
  selectedStop: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_STOP:
      return { ...state, selectedStop: action.payload };

    default:
      return state;
  }
};
