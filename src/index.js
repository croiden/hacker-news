// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Loadable from 'react-loadable'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import NewsReducer from './reducers'

window.onload = () => {
    Loadable.preloadReady().then(() => {
        // Grab the state from a global variable injected into the server-generated HTML
        const preloadedState = window.__PRELOADED_STATE__

        // Allow the passed state to be garbage-collected
        delete window.__PRELOADED_STATE__

        // Create Redux store with initial state
        const store = createStore(NewsReducer, preloadedState)

        const root = document.getElementById('root')
        root &&
            ReactDOM.hydrate(
                <Provider store={store}>
                    <App />
                </Provider>,
                root
            )
    })
}
