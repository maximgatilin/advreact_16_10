import {appName} from '../config'
import {Record, List} from 'immutable'
import {reset} from 'redux-form';

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
    list: List()
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case ADD_PEOPLE_ENTRY:
            return state.set('list', state.get('list').push(payload.entry))

        default:
            return state
    }
}

/**
 * Action Creators
 * */
export function addPeopleEntry(entry) {
    return (dispatch) => {
        dispatch({
            type: ADD_PEOPLE_ENTRY,
            payload: {entry}
        })
        dispatch(reset('peopleAdd'));
    }
}