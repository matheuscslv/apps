import { combineReducers } from "redux";
import { reducer as user } from "./user";

import agenda from "./agenda";
import noticias from "./noticias";

const reducers = combineReducers({
  // Remova essa linha depois de adicionar seus ducks
  user,
  agenda,
  noticias
});

export default reducers;
