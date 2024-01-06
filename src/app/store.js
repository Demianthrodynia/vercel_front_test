import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import userSlice from '../pages/userSlice';
import editionSlice from '../pages/editionSlice';
import editSlice from '../pages/editSlice';
import characterSlice from '../pages/characterSlice';
import errorModalSlice from '../pages/errorModalSlice';


const reducers = combineReducers({
    edit: editSlice,
    edition: editionSlice,
    user: userSlice,
    character: characterSlice,
    errorModal: errorModalSlice
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});