import {appName} from '../config'
import {Record} from 'immutable'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const ADD_PEOPLE_ENTRY = `${prefix}/ADD_PEOPLE`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    people: []
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case ADD_PEOPLE_ENTRY:
            return state.set('people', state.get('people').push(payload.entry))

        default:
            return state
    }
}

/**
 * Action Creators
 * */
export function addPeopleEntry(entry) {
    return {
        type: ADD_PEOPLE_ENTRY,
        payload: {entry}
    }
}