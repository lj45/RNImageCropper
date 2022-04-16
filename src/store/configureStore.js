import reducer from '../reducers/Reducer';
import {createStore} from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {devToolsEnhancer} from 'redux-devtools-extension';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['ssb'],
};
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer, devToolsEnhancer());

export const persistor = persistStore(store, [
  {manualPersist: false},
  a => console.log('rehydration finished with: ', a),
]);
