import storage from 'redux-persist/lib/storage'

import {
    SET_FAVORITES_MESSAGE,

    SET_SIGN_IN_MESSAGE,
    SET_SIGN_UP_MESSAGE,

    SIGN_UP_PENDING,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILED,

    SIGN_IN_PENDING,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILED,

    SIGN_OUT,

    UPDATE_FAVORITES_PENDING,
    UPDATE_FAVORITES_SUCCESS,
    UPDATE_FAVORITES_FAILED,
}
    from './page.data.constants'

import { favoritesStringToArray } from './page.data.utils';


const initialStatePageData = {
    isLoggedIn: false,
    signInMessage: '',
    signUpMessage: '',
    isPending: false,
    user: {
        id: '',
        displayName: 'user',
        email: '',
        favorites: [],
        joined: '',
    },
}

export const pageDataRED = (state = initialStatePageData, action = {}) => {
    switch (action.type) {

        case SET_FAVORITES_MESSAGE:
            return Object.assign({}, state, { favoriteMessage: action.payload })

        case SET_SIGN_IN_MESSAGE:
            return Object.assign({}, state, { signInMessage: action.payload })

        case SET_SIGN_UP_MESSAGE:
            return Object.assign({}, state, { signUpMessage: action.payload })


        case SIGN_UP_PENDING:
            return Object.assign({}, state, { signUpMessage: 'Registering...', isPending: true })

        case SIGN_UP_FAILED:
            return Object.assign({}, state, { signUpMessage: action.payload, isPending: false })

        case SIGN_UP_SUCCESS:
            return Object.assign({}, state, { signUpMessage: action.payload })


        case SIGN_IN_PENDING:
            return Object.assign({}, state, { signInMessage: 'Signing In...', registeredMessage: '', isPending: true })

        case SIGN_IN_FAILED:
            return Object.assign({}, state, { signInMessage: action.payload, isPending: false })

        case SIGN_IN_SUCCESS:
            const favoritesInArray = favoritesStringToArray(action.payload.favorites)
            console.log(action.payload.favorites)
            return Object.assign({}, state, {
                isLoggedIn: true,
                user: Object.assign({}, state.user, {
                    id: action.payload.id,
                    displayName: action.payload.displayname,
                    email: action.payload.email,
                    favorites: favoritesInArray,
                    joined: action.payload.joined
                })
            })

        case SIGN_OUT:
            storage.removeItem('persist:root')
            return Object.assign({}, state, initialStatePageData)


        case UPDATE_FAVORITES_PENDING:
            return Object.assign({}, state, {
                user: Object.assign({}, state.user, { favorites: action.payload }),
                isPending: true
            })


        case UPDATE_FAVORITES_SUCCESS:
            //var favoritesInArray = favoritesStringToArray(action.payload.reply)
            return Object.assign({}, state, { isPending: false })

        case UPDATE_FAVORITES_FAILED:
            return Object.assign({}, state, { favoriteMessage: action.payload, isPending: false })

        default:
            return state;
    }
}