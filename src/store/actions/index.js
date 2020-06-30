//@flow
import { INCREMENT_VOTE, HIDE_ITEM } from '../actionTypes'
import { updateVote, hideItem as hideItemBrowser } from '../browser'

export function incrementVote(id: string, points: number) {
    return function(dispatch: any) {
        updateVote(id, points + 1)
        // TODO: here we can update the votes to the server side
        return Promise.resolve().then(json =>
            dispatch({
                type: INCREMENT_VOTE,
                payload: {
                    id,
                    points: points + 1,
                },
            })
        )
    }
}

export function hideItem(id: string) {
    return function(dispatch: any) {
        hideItemBrowser(id)
        // TODO: here we can update the hidden flag to the server side
        return Promise.resolve().then(json => dispatch({ type: HIDE_ITEM, payload: { id } }))
    }
}
