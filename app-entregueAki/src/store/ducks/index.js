import { combineReducers } from 'redux';

import { reducer as bags } from './bag';
import { reducer as products } from './product';
import { reducer as shopping } from './shopping';
import { reducer as truckage } from './truckage';
import { reducer as user } from './user';
import { reducer as wallet } from './wallet';

const reducers = combineReducers({
  bags,
  products,
  wallet,
  user,
  shopping,
  truckage,
});

export default reducers;
