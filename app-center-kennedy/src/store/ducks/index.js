import {combineReducers} from 'redux';
import {reducer as user} from './user';
const reducers = combineReducers({
  user,
});

export default reducers;
