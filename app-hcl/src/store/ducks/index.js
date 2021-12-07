import { combineReducers } from 'redux';

import { reducer as constants } from './constants';
import { reducer as matche } from './matche';
import { reducer as user } from './user';

const reducers = combineReducers({
  matche,
  user,
  constants,
});

export default reducers;
