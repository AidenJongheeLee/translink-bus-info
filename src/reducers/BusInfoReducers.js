import { STOP_ESTIMATE_SUCCESS, STOP_ESTIMATE_FAIL } from '../actions/types';

const INITIAL_STATE = {
  RouteNo: '',
  error: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STOP_ESTIMATE_SUCCESS:
      return action.payload[0];

    case STOP_ESTIMATE_FAIL:
      return { ...INITIAL_STATE, error: true };

    default:
      return state;
  }
};
