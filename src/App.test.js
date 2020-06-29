import React from 'react'
import { render } from '@testing-library/react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import NewsReducer from './store/reducers'

it.skip('renders learn react link', () => {
    const { getByText } = render(<App />)
    const linkElement = getByText(/Comments/i)
    expect(linkElement).toBeInTheDocument()
})

it('renders without crashing', () => {
    const store = createStore(NewsReducer, {
        items: [],
        page: 0,
    })
    const div = document.createElement('div')
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        div
    )
})
