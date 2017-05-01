import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import MainReducer from './main-reducer';

const rootReducer = combineReducers({
  state: (state = {}) => state,
  form: formReducer,
  main: MainReducer
});

export default rootReducer;
