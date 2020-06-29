// @flow
import { type StoreType } from '../../types'
import { INCREMENT_VOTE, HIDE_ITEM } from '../actionTypes'
import { updateVote, hideItem } from '../browser'
const initialState = {
    page: 0,
    totalPages: 0,
    items: {},
}
export default (state: StoreType = initialState, action: Object): StoreType => {
    switch (action.type) {
        case INCREMENT_VOTE:
            updateVote(action.id, state.items[action.id].points + 1)
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
            hideItem(action.id)
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
