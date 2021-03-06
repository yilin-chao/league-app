import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
//use localstorage as default storage (you can use sessionStorage)
import storage from 'redux-persist/lib/storage';

import summonerReducer from './summoner/summoner.reducer';
import freeRotationReducer from './free-rotation/free-rotation.reducer';
import patchReducer from './patch/patch.reducer';
import ddragonReducer from './ddragon/ddragon.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['summoner', 'patch', 'champion']
}

const rootReducer = combineReducers({
    summoner: summonerReducer,
    freeRotation: freeRotationReducer,
    patch: patchReducer,
    ddragon: ddragonReducer
})

export default persistReducer(persistConfig, rootReducer);