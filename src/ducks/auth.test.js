import {
    signIn,
    signUp,
    signInSaga,
    signUpSaga,
    redirectSaga,
    SIGN_IN_START,
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
    SIGN_UP_START,
    SIGN_UP_SUCCESS,
    SIGN_UP_ERROR
} from './auth'
import {call, put, take} from 'redux-saga/effects'
import firebase from 'firebase'
import {reset} from 'redux-form'
import {push} from 'react-router-redux'

/**
 * Sign in
 * */

it('should sign in successfully', () => {
    const authData = {
        email: 'test@test.com',
        password: '12345678'
    }

    const mockUser = {
        name: 'Ivan',
        age: 22
    }

    const auth = firebase.auth()

    const requestAction = signIn(authData)

    const gen = signInSaga(requestAction)

    expect(gen.next().value).toEqual(take(SIGN_IN_START))

    expect(gen.next({payload: authData}).value).toEqual(call([auth, auth.signInWithEmailAndPassword], authData.email, authData.password))

    expect(gen.next(mockUser).value).toEqual(put({
        type: SIGN_IN_SUCCESS,
        payload: {user: mockUser}
    }))

    expect(gen.next().value).toEqual(put(reset('auth')));
})

it('should sign in with error', () => {
    const authData = {
        email: 'test@test.com',
        password: '12345678'
    }

    const mockError = new Error('error');

    const auth = firebase.auth()

    const requestAction = signIn(authData)

    const gen = signInSaga(requestAction)

    expect(gen.next().value).toEqual(take(SIGN_IN_START))

    expect(gen.next({payload: authData}).value).toEqual(call([auth, auth.signInWithEmailAndPassword], authData.email, authData.password))

    expect(gen.throw(mockError).value).toEqual(put({
        type: SIGN_IN_ERROR,
        payload: {error: mockError}
    }))
})

/**
 * Sign up
 * */

it('should sign up successfully', () => {
    const authData = {
        email: 'test@test.com',
        password: '12345678'
    }

    const mockUser = {
        name: 'Ivan',
        age: 22
    }

    const auth = firebase.auth()

    const requestAction = signUp(authData)

    const gen = signUpSaga(requestAction)

    expect(gen.next().value).toEqual(take(SIGN_UP_START))

    expect(gen.next({payload: authData}).value).toEqual(call([auth, auth.createUserWithEmailAndPassword], authData.email, authData.password))

    expect(gen.next(mockUser).value).toEqual(put({
        type: SIGN_UP_SUCCESS,
        payload: {user: mockUser}
    }))

    expect(gen.next().value).toEqual(put(reset('auth')));
})

it('should sign up with error', () => {
    const authData = {
        email: 'test@test.com',
        password: '12345678'
    }

    const mockError = new Error('error');

    const auth = firebase.auth()

    const requestAction = signUp(authData)

    const gen = signUpSaga(requestAction)

    expect(gen.next().value).toEqual(take(SIGN_UP_START))

    expect(gen.next({payload: authData}).value).toEqual(call([auth, auth.createUserWithEmailAndPassword], authData.email, authData.password))

    expect(gen.throw(mockError).value).toEqual(put({
        type: SIGN_UP_ERROR,
        payload: {error: mockError}
    }))
})


/**
 * Redirect
 * */

it('should redirect after successful login', () => {
    const gen = redirectSaga()

    expect(gen.next().value).toEqual(take(SIGN_IN_SUCCESS));

    expect(gen.next().value).toEqual(put(push('/people')))
})


