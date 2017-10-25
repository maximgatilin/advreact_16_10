import {appName} from '../config'
import {Record, List} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import {generateId} from './utils'
import {reset} from 'redux-form';

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON = `${prefix}/ADD_PERSON`

/**
 * Reducer
 * */
const ReducerState = Record({
    entities: new List([])
})

const PersonRecord = Record({
    id: null,
    firstName: null,
    lastName: null,
    email: null
})

export default function reducer(state = new ReducerState(), action) {
    const {type, payload} = action

    switch (type) {
        case ADD_PERSON:
            return state.update('entities', entities => entities.push(new PersonRecord(payload.person)))

        default:
            return state
    }
}
/**
 * Selectors
 * */

/**
 * Action Creators
 * */

export function addPerson(person) {
    return {
        type: ADD_PERSON_REQUEST,
        payload: { person }
    }
}

/**
 *Sagas
 * */

export function * addPersonSaga(action) {
    const id = yield call(generateId)

    const effect = put({
        type: ADD_PERSON,
        payload: { id, ...action.payload.person }
    })

    console.log('---', effect)

    yield effect

    yield put(reset('person'))
}

export function * saga() {
    console.log('---', 'saga up and running')
    yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga)
}