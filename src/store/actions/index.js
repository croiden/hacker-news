//@flow
import { INCREMENT_VOTE, HIDE_ITEM } from '../actionTypes'

type IncrementVote = {
    type: typeof INCREMENT_VOTE,
    id: number,
}
export const incrementVote = (id: number): IncrementVote => ({ type: INCREMENT_VOTE, id })

type HideItem = {
    type: typeof HIDE_ITEM,
    id: number,
}
export const hideItem = (id: number): HideItem => ({ type: HIDE_ITEM, id })
