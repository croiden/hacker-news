// @flow
import { type StoreType } from '../../types'
import { INCREMENT_VOTE, HIDE_ITEM } from '../actionTypes'
const initialState = {
    page: 0,
    totalPages: 0,
    items: {},
}
export default (state: StoreType = initialState, action: Object) => {
    switch (action.type) {
        case INCREMENT_VOTE:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.id]: {
                        ...state.items[action.id],
                        points: state.items[action.id].points + 1,
                    },
                },
            }
        case HIDE_ITEM:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.id]: {
                        ...state.items[action.id],
                        hidden: true,
                    },
                },
            }
        default:
            return state
    }
}
