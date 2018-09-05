import { combineReducers } from 'redux';
import StopsReducers from './StopsReducers';
import BusInfoReducers from './BusInfoReducers';

export default combineReducers({
  stops: StopsReducers,
  busInfo: BusInfoReducers
});
