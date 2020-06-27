// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Loadable from 'react-loadable'

window.onload = () => {
    Loadable.preloadReady().then(() => {
        const root = document.getElementById('root')
        root && ReactDOM.hydrate(<App />, root)
    })
}
