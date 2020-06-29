// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import NewsReducer from './store/reducers'
import { getStorageData } from './store/browser'
import * as serviceWorker from './serviceWorker'

window.onload = () => {
    // Grab the state from a global variable injected into the server-generated HTML
    const preloadedState = window.__PRELOADED_STATE__

    // Allow the passed state to be garbage-collected
    delete window.__PRELOADED_STATE__

    const storageData = getStorageData()
    Object.keys(storageData).forEach((id: string) => {
        preloadedState.items[id] = {
            ...preloadedState.items[id],
            ...storageData[id],
        }
    })

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
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
