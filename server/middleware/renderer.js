import React from 'react'
import ReactDOMServer from 'react-dom/server'
import axios from 'axios'
import _ from 'lodash'
import { ServerStyleSheet } from 'styled-components'

// import our main App component
import App from '../../src/App'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import NewsReducer from '../../src/reducers'

const path = require('path')
const fs = require('fs')

export default (req, res, next) => {
    // point to the html file created by CRA's build tool
    const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html')
    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('err', err)
            return res.status(404).end()
        }

        const page = parseInt(req.query.page) || 0
        axios
            .get(`https://hn.algolia.com/api/v1/search?page=${page}`)
            .then(result => {
                // Create a new Redux store instance
                const store = createStore(NewsReducer, {
                    items: _.keyBy(result.data.hits, 'objectID'),
                    page: page,
                })

                const sheet = new ServerStyleSheet()
                // render the app as a string
                const html = ReactDOMServer.renderToString(
                    sheet.collectStyles(
                        <Provider store={store}>
                            <App />
                        </Provider>
                    )
                )
                const styles = sheet.getStyleTags() // <-- getting all the tags from the sheet

                // Grab the initial state from our Redux store
                const preloadedState = store.getState()
                // WARNING: See the following for security issues around embedding JSON in HTML:
                // https://redux.js.org/recipes/server-rendering/#security-considerations
                const initialState = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
                    preloadedState
                ).replace(/</g, '\\u003c')}</script>`

                // inject the rendered app into our html and send it
                return res.send(
                    htmlData
                        .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
                        .replace('</body>', `${initialState} </body>`)
                        .replace('</head>', `${styles} </head>`)
                )
            })
            .catch(err => {
                console.error('err', err)
                return res.status(404).end()
            })
    })
}
