import { START_REQUEST, REQUEST_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_REQUEST:
      return { ...state, loading: true };

    case REQUEST_SUCCESS:
      return { ...state, loading: false };

    default:
      return state;
  }
};
