import NewsReducer from '../../../store/reducers/'
import { INCREMENT_VOTE, HIDE_ITEM } from '../../../store/actionTypes'

describe('Testing news reducer', () => {
    it('should return the default state', () => {
        const action = { type: 'dummy_action' }
        const initialState = {
            page: 0,
            totalPages: 0,
            items: {},
        }

        expect(NewsReducer(undefined, action)).toEqual(initialState)
    })

    it('should increment the vote by 1', () => {
        const action = { type: INCREMENT_VOTE, payload: { id: '123', points: 234 } }
        const initialState = {
            page: 1,
            totalPages: 10,
            items: {
                123: {
                    points: 233,
                },
                456: {
                    points: 120,
                },
            },
        }

        const expectedState = {
            page: 1,
            totalPages: 10,
            items: {
                123: {
                    points: 234,
                },
                456: {
                    points: 120,
                },
            },
        }

        expect(NewsReducer(initialState, action)).toEqual(expectedState)
    })

    it('should hide the item', () => {
        const action = { type: HIDE_ITEM, payload: { id: '456' } }
        const initialState = {
            page: 1,
            totalPages: 10,
            items: {
                123: {
                    points: 233,
                },
                456: {
                    points: 120,
                },
            },
        }

        const expectedState = {
            page: 1,
            totalPages: 10,
            items: {
                123: {
                    points: 233,
                },
                456: {
                    points: 120,
                    hidden: true,
                },
            },
        }

        expect(NewsReducer(initialState, action)).toEqual(expectedState)
    })
})
