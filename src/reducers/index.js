import { combineReducers } from 'redux';
import StopsReducers from './StopsReducers';
import BusInfoReducers from './BusInfoReducers';
import LoadingReducers from './LoadingReducers';
import SelectedReducers from './SelectedReducers';

export default combineReducers({
  stops: StopsReducers,
  busInfo: BusInfoReducers,
  loading: LoadingReducers,
  seelctedStop: SelectedReducers
});
