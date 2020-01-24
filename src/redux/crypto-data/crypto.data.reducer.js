//import update from 'react-addons-update';

import {
    SET_MAIN_MESSAGE,

    SEARCH_OR_FAVORITES_RESULT,

    TOGGLE_FAVORITES,

    FETCH_TOP_CRYPTO_SUCCESS,
    FETCH_TOP_CRYPTO_FAILED,

    FETCH_ALL_CRYPTO_SUCCESS,
    FETCH_ALL_CRYPTO_FAILED,

    FETCH_DETAIL_DATA_PENDING,
    FETCH_DETAIL_DATA_SUCCESS,
    FETCH_DETAIL_DATA_FAILED,
}
    from './crypto.data.constants'

import { getCryptoList, getAllCryptoList, prepareCryptoDetailData } from './crypto.data.utils';


const initialStateCryptoData = {
    mainMessage: '',
    initFetchDone: false,
    allCryptoFetchDone: false,
    allCrypto: [],
    cryptoToPresent: [],
    detailsOfCryptosToPresent: [],
}


export const cryptoDataRED = (state = initialStateCryptoData, action = {}) => {
    switch (action.type) {

        case SET_MAIN_MESSAGE:
            return Object.assign({}, state, { mainMessage: action.payload })


        case SEARCH_OR_FAVORITES_RESULT:
            return Object.assign({}, state, { mainMessage: action.payload[0], cryptoToPresent: action.payload[1] });

        case TOGGLE_FAVORITES:
            let tempState = [ ...state.detailsOfCryptosToPresent ];
            const newState = tempState.map(cryptoData => {
                if (cryptoData.cryptoName === action.payload) {
                    cryptoData.isFavorite = !cryptoData.isFavorite
                }
                return cryptoData
            })
            return Object.assign({}, state, { detailsOfCryptosToPresent: newState });

            
        case FETCH_TOP_CRYPTO_FAILED:
            return Object.assign({}, state, { mainMessage: action.payload })

        case FETCH_TOP_CRYPTO_SUCCESS:
            const cryptoList = getCryptoList(action.payload);
            return Object.assign({}, state, { cryptoToPresent: cryptoList, initFetchDone: true });


        case FETCH_ALL_CRYPTO_FAILED:
            return Object.assign({}, state, { mainMessage: action.payload })

        case FETCH_ALL_CRYPTO_SUCCESS:
            const allCryptoList = getAllCryptoList(action.payload)
            return Object.assign({}, state, { allCrypto: allCryptoList, allCryptoFetchDone: true })


        case FETCH_DETAIL_DATA_PENDING:
            return Object.assign({}, state, { detailsOfCryptosToPresent: [] });

        case FETCH_DETAIL_DATA_FAILED:
            return Object.assign({}, state, { mainMessage: action.payload })

        case FETCH_DETAIL_DATA_SUCCESS:
            const cryptoDetailData = prepareCryptoDetailData(action.payload);
            return Object.assign({}, state, { detailsOfCryptosToPresent: [...state.detailsOfCryptosToPresent, cryptoDetailData], });

        default:
            return state;
    }
}

