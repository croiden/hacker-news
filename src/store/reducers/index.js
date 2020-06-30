// @flow
import { type StoreType } from '../../types'
import { INCREMENT_VOTE, HIDE_ITEM } from '../actionTypes'
const initialState = {
    page: 0,
    totalPages: 0,
    items: {},
}
export default (state: StoreType = initialState, action: Object): StoreType => {
    switch (action.type) {
        case INCREMENT_VOTE:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: {
                        ...state.items[action.payload.id],
                        points: action.payload.points,
                    },
                },
            }
        case HIDE_ITEM:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: {
                        ...state.items[action.payload.id],
                        hidden: true,
                    },
                },
            }
        default:
            return state
    }
}
