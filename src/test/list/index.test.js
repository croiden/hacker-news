import React from 'react'
import { render, cleanup } from '@testing-library/react'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import List from '../../list'
import NewsReducer from '../../store/reducers'

import data from '../data'

afterEach(cleanup)

describe('List Component snapshot', () => {
    it('List snapshot', () => {
        const store = createStore(NewsReducer, {
            items: data,
            page: 0,
            totalPages: 10,
        })
        const { asFragment } = render(
            <Provider store={store}>
                <List />
            </Provider>
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
