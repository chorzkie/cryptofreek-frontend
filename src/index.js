import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import stateStore from './redux/store';
// import { PersistGate } from 'redux-persist/integration/react';
// import { stateStore, persistor } from './redux/store';


// ReactDOM.render(
//     <Provider store={stateStore} >
//         <BrowserRouter>
//             <PersistGate persistor={persistor} >
//                 <App />
//             </PersistGate>
//         </BrowserRouter>
//     </Provider>
//     , document.getElementById('root'));

    
ReactDOM.render(
    <Provider store={stateStore} >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));


serviceWorker.unregister();
