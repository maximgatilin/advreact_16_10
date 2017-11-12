import {appName} from '../config'
import {Record} from 'immutable'
import firebase from 'firebase'
import {createSelector} from 'reselect'
import {call, put, all, take, spawn} from 'redux-saga/effects'
import {replace} from 'react-router-redux'
import {eventChannel} from 'redux-saga'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_UP_START = `${prefix}/SIGN_UP_START`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`

export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    user: null,
    loading: false,
    error: null
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case SIGN_UP_START:
            return state.set('loading', true)

        case SIGN_IN_SUCCESS:
            return state
                .set('user', payload.user)
                .set('loading', false)

        default:
            return state
    }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const userSelector = createSelector(stateSelector, state => state.user)

/**
 * Action Creators
 * */
export function signUp(email, password) {
    return {
        type: SIGN_UP_START,
        payload: { email, password }
    }
}

export function signIn(email, password) {
    return {
        type: SIGN_IN_REQUEST,
        payload: {email, password}
    }
}

/**
 * Sagas
 **/

export function * signUpSaga() {
    const auth = firebase.auth()

    while (true) {
        const {payload} = yield take(SIGN_UP_START)

        try {
            const user = yield call([auth, auth.createUserWithEmailAndPassword], payload.email, payload.password)
            //const user = apply(auth, createUserWithEmailAndPassword, [email, password])

            yield put({
                type: SIGN_UP_SUCCESS,
                payload: {user}
            })
        } catch (error) {
            yield put({
                type: SIGN_UP_ERROR,
                payload: {error}
            })
        }
    }
}

export const signInSaga = function * () {
    const auth = firebase.auth()

    while (true) {
        const action = yield take(SIGN_IN_REQUEST)

        try {
            yield call(
                [auth, auth.signInWithEmailAndPassword],
                action.payload.email, action.payload.password
            )

        } catch (error) {
            yield put({
                type: SIGN_IN_ERROR,
                payload: {error}
            })
        }
    }
}

export function * watchStatusChangeSaga() {
    while (true) {
        yield take(SIGN_IN_SUCCESS)

        yield (put(replace('/admin')))
    }
}

const createAuthSocket = () => eventChannel(emit => {
    const auth = firebase.auth();
    const callback = user => emit({ user })

    auth.onAuthStateChanged(callback)

    // empty function for unsubscribe
    return () => {};
})

export const realtimeAuthSaga = function * () {
    const chan = yield call(createAuthSocket)

    while (true) {
        const { user } = yield take(chan)

        if (user) {
            yield put({
                type: SIGN_IN_SUCCESS,
                payload: { user }
            })
        }
    }
}


export function * saga() {
    yield spawn(realtimeAuthSaga)

    yield all([
        signUpSaga(),
        signInSaga(),
        watchStatusChangeSaga()
    ])
}