import FetchResource from '../FetchResource';
import { STOP_FETCH_SUCCESS, STOP_ESTIMATE_SUCCESS, STOP_ESTIMATE_FAIL } from '../actions/types';

export const stopsFetch = (lat, long) => {
  return dispatch => {
    FetchResource.getAllStops(lat, long).then(res => {
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
      .catch(err => {
        console.log('here');
        dispatch({ type: STOP_ESTIMATE_FAIL });
      });
  };
};
