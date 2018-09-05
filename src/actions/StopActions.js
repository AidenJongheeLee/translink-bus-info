import FetchResource from '../FetchResource';
import {
  STOP_FETCH_SUCCESS,
  STOP_ESTIMATE_SUCCESS,
  STOP_ESTIMATE_FAIL,
  START_REQUEST,
  REQUEST_SUCCESS,
  SELECT_STOP
} from '../actions/types';

export const stopsFetch = (lat, long) => {
  return dispatch => {
    dispatch({ type: START_REQUEST });
    FetchResource.getAllStops(lat, long).then(res => {
      dispatch({ type: REQUEST_SUCCESS });
      dispatch({ type: STOP_FETCH_SUCCESS, payload: res.body });
    });
  };
};

export const stopEstimate = stop_num => {
  return dispatch => {
    FetchResource.getStopEstimate(stop_num)
      .then(res => {
        dispatch({ type: STOP_ESTIMATE_SUCCESS, payload: res.body });
      })
      .catch(() => {
        dispatch({ type: STOP_ESTIMATE_FAIL });
      });
  };
};

export const selectStop = stop => {
  return {
    type: SELECT_STOP,
    payload: stop
  };
};
