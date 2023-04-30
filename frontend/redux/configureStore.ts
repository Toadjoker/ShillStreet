import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { campaignsReducer } from './campaigns/campaigns';

const reducer = combineReducers({
  campaignsReducer
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;