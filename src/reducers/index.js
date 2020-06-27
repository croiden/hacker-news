// @flow
export default (state: Object = [], action: Object) => {
    switch (action.type) {
        case 'INCREMENT_VOTE':
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
        case 'HIDE_ITEM':
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
