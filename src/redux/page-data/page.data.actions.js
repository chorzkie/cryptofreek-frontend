//import stateStore from '../store';

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

import { favoritesArrayToString } from './page.data.utils';

export const setFavoritesMessageACT = (text) => ({
    type: SET_FAVORITES_MESSAGE,
    payload: text
})

export const setSignInMessageACT = (text) => ({
    type: SET_SIGN_IN_MESSAGE,
    payload: text
})

export const setSignUpMessageACT = (text) => ({
    type: SET_SIGN_UP_MESSAGE,
    payload: text
})

export const updateFavoritesListACT = (userId, newFavoritesList) => (dispatch) => {

    const newFavoritesListinString = favoritesArrayToString(newFavoritesList);
    dispatch({ type: UPDATE_FAVORITES_PENDING, payload: newFavoritesList })

    fetch('https://mighty-thicket-99157.herokuapp.com/updatefavorites', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id:userId,
            favorites:newFavoritesListinString
        })
    })
        .then(response => response.json())
        .then(reply => {
            if (reply === 'Unable to update favorites') {
                dispatch({
                    type: UPDATE_FAVORITES_FAILED,
                    payload: reply
                })
            }
            else {
                dispatch({
                    type: UPDATE_FAVORITES_SUCCESS,
                    payload: reply
                })
            }
        })
        .catch(err => {
            dispatch({
                type: UPDATE_FAVORITES_FAILED,
                payload: 'Unable to update favorites list'
            })
        })
}

export const submitSignUpACT = (displayName, email, password) => (dispatch) => {
    dispatch({ type: SIGN_UP_PENDING })
    fetch('https://mighty-thicket-99157.herokuapp.com/signup', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            displayName,
            email,
            password
        })
    })
        .then(response => response.json())
        .then(reply => {
            if (reply === 'Email already registered') {
                dispatch({
                    type: SIGN_UP_FAILED,
                    payload: reply
                })
            }
            else if (reply === 'Incorrect form submission') {
                dispatch({
                    type: SIGN_UP_FAILED,
                    payload: reply
                })
            }
            else {
                dispatch({
                    type: SIGN_UP_SUCCESS,
                    payload: 'Registration successful. Please login'
                })
            }
        })
        .catch(err => {
            dispatch({
                type: SIGN_UP_FAILED,
                payload: 'Unable to register'
            })
        })
}

export const submitSignInACT = (email, password) => (dispatch) => {
    dispatch({ type: SIGN_IN_PENDING })
    fetch('https://mighty-thicket-99157.herokuapp.com/signin', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(response => response.json())
        .then(reply => {
            if (reply === 'Username or password incorrect') {
                dispatch({
                    type: SIGN_IN_FAILED,
                    payload: reply
                })
            }
            else if (reply.id) { //using reply.id just for checking that the signing in user is valid and has ID
                console.log(reply)
                dispatch({
                    type: SIGN_IN_SUCCESS,
                    payload: reply
                    
                })
            }
        })
        .catch(err => {
            dispatch({
                type: SIGN_IN_FAILED,
                payload: 'Unable to log in'
            })
        })
}

export const signOutACT = () => ({
    type: SIGN_OUT,
})