import {combineReducers} from 'redux';

export const cfgInitState = {darkMode: true};
export const cfgReducer = (state = cfgInitState, {type, payload}) => {
  switch (type) {
    case 'setDarkMode':
      return {...state, darkMode: payload};
    case 'reset':
      return cfgInitState;
    default:
      return state;
  }
};

const reducer = combineReducers({
  cfg: cfgReducer,
});

export default reducer;
