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

    API_KEY,
}
    from './crypto.data.constants'

import stateStore from '../../redux/store'



export const setMainMessageACT = (text) => ({
    type: SET_MAIN_MESSAGE,
    payload: text
})


export const backToFrontPageACT = () => (dispatch) => {
    dispatch(fetchTopCryptoACT());
    dispatch({
        type: SET_MAIN_MESSAGE,
        payload: 'Here are 10 hottest cryptos of the last 24 hours..'
    })
    setTimeout(() => dispatch(getCryptoDetailsToPresentACT()), 2000);
}


// export const toggleFavoritesStateACT = (crypto) => (dispatch) => {
//     const index = stateStore.getState().cryptoDataRED.detailsOfCryptosToPresent.findIndex(cryptoData => cryptoData.cryptoName === crypto)
//     dispatch({
//         type: TOGGLE_FAVORITES,
//         payload: index,
//     })
// }

export const toggleFavoritesStateACT = (crypto) => ({
    type: TOGGLE_FAVORITES,
    payload: crypto,
})


export const processSearchOrFavoritesResultACT = (passedData) => (dispatch) => {
    if (passedData[1] === []) {
        return
    }
    else {
        dispatch({
            type: SEARCH_OR_FAVORITES_RESULT,
            payload: passedData
        })
    }
}

export const fetchTopCryptoACT = () => (dispatch) => {

    const fetchTopCryptoUrl = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=' + API_KEY

    fetch(fetchTopCryptoUrl, { method: 'get', })
        .then(response => response.json())
        .then(reply => {
            if (reply.Message === 'Success') {
                dispatch({
                    type: FETCH_TOP_CRYPTO_SUCCESS,
                    payload: reply
                })
            }
            else {
                dispatch({
                    type: FETCH_TOP_CRYPTO_FAILED,
                    payload: 'Unable to retrieve top cryptocurrencies list'
                })
            }
        })
        .catch(err => {
            dispatch({
                type: FETCH_TOP_CRYPTO_FAILED,
                payload: 'Unable to retrieve top cryptocurrencies list'
            })
        })
}


export const fetchAllCryptoACT = () => (dispatch) => {
    const fetchAllCryptoUrl = 'https://min-api.cryptocompare.com/data/blockchain/list?api_key=' + API_KEY

    fetch(fetchAllCryptoUrl, { method: 'get', })
        .then(response => response.json())
        .then(reply => {
            if (reply.Response === 'Success') {
                dispatch({
                    type: FETCH_ALL_CRYPTO_SUCCESS,
                    payload: reply
                })
            }
            else {
                dispatch({
                    type: FETCH_ALL_CRYPTO_FAILED,
                    payload: 'Unable to retrieve the list of all cryptocurrencies'
                })
            }
        })
        .catch(err => {
            dispatch({
                type: FETCH_ALL_CRYPTO_FAILED,
                payload: 'Unable to retrieve the list of all cryptocurrencies'
            })
        })
}


export const fetchDetailDataACT = (cryptoId, cryptoName, favorites) => (dispatch) => {
    let dataMinutely = {}
    let dataHourly = {}

    const fetchMinutelyUrl = 'https://min-api.cryptocompare.com/data/v2/histominute?tsym=USD&limit=1&fsym=' + cryptoName + '&api_key=' + API_KEY;
    const fetchHourlyUrl = 'https://min-api.cryptocompare.com/data/v2/histohour?tsym=USD&limit=24&fsym=' + cryptoName + '&api_key=' + API_KEY;

    fetch(fetchMinutelyUrl, { method: 'get', })
        .then(response => response.json())
        .then(reply1 => {
            if (reply1.Response === 'Success') {
                dataMinutely = reply1;

                fetch(fetchHourlyUrl, { method: 'get', })
                    .then(response => response.json())
                    .then(reply2 => {
                        if (reply2.Response === 'Success') {
                            dataHourly = reply2;
                            dispatch({
                                type: FETCH_DETAIL_DATA_SUCCESS,
                                payload: [dataMinutely, dataHourly, cryptoId, cryptoName, favorites]
                            })
                        }
                        else {
                            dispatch({
                                type: FETCH_DETAIL_DATA_FAILED,
                                payload: 'Unable to retrieve detail data of ' + cryptoName
                            })
                        }
                    })
                    .catch(err => {
                        dispatch({
                            type: FETCH_DETAIL_DATA_FAILED,
                            payload: 'Unable to retrieve detail data of ' + cryptoName
                        })
                    })
            }
            else {
                dispatch({
                    type: FETCH_DETAIL_DATA_FAILED,
                    payload: 'Unable to retrieve detail data of ' + cryptoName
                })
            }
        })
        .catch(err => {
            dispatch({
                type: FETCH_DETAIL_DATA_FAILED,
                payload: 'Unable to retrieve detail data of ' + cryptoName
            })
        })
}



export const getCryptoDetailsToPresentACT = (cryptoPresent = stateStore.getState().cryptoDataRED.cryptoToPresent) => (dispatch) => {
    dispatch({ type: FETCH_DETAIL_DATA_PENDING, })
    cryptoPresent.map(aCrypto => {
        dispatch(fetchDetailDataACT(aCrypto.id, aCrypto.name, stateStore.getState().pageDataRED.user.favorites))
        return aCrypto
    })
}
