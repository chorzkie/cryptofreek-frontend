// import { createStore, applyMiddleware } from 'redux';
// import { persistStore } from 'redux-persist';
// import logger from 'redux-logger';
// import thunk from 'redux-thunk';
// import { pReducer } from './root.reducer';


// const middlewares = [thunk]

// if (process.env.NODE_ENV === 'development') {
//     middlewares.push(logger);
// }

// export const stateStore = createStore(pReducer, applyMiddleware(...middlewares));
// export const persistor = persistStore(stateStore);

// export default { stateStore, persistor };



import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './root.reducer';


const middlewares = [thunk]

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const stateStore = createStore(rootReducer, applyMiddleware(...middlewares));

export default stateStore;
