// import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'
// import { pageDataRED } from './page-data/page.data.reducer';
// import { cryptoDataRED } from './crypto-data/crypto.data.reducer';



// const persistConfig = { key: 'root', storage: storage, whitelist: ['pageDataRED', 'cryptoDataRED'] }
// const rootReducer = combineReducers({ pageDataRED, cryptoDataRED });

// export const pReducer = persistReducer(persistConfig, rootReducer);



import { combineReducers } from 'redux';

import { pageDataRED } from './page-data/page.data.reducer';
import { cryptoDataRED } from './crypto-data/crypto.data.reducer';

export default combineReducers({
    pageDataRED,
    cryptoDataRED,
});