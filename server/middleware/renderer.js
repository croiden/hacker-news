import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Loadable from 'react-loadable'
import axios from 'axios'
import _ from 'lodash'

// read the manifest file
import manifest from '../../build/asset-manifest.json'

// import our main App component
import App from '../../src/App'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import NewsReducer from '../../src/reducers'

const path = require('path')
const fs = require('fs')

const extractAssets = (assets, chunks) =>
    Object.keys(assets)
        .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
        .map(k => assets[k])

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

                const modules = []
                // render the app as a string
                const html = ReactDOMServer.renderToString(
                    <Loadable.Capture report={m => modules.push(m)}>
                        <Provider store={store}>
                            <App />
                        </Provider>
                    </Loadable.Capture>
                )
                // Grab the initial state from our Redux store
                const preloadedState = store.getState()
                // WARNING: See the following for security issues around embedding JSON in HTML:
                // https://redux.js.org/recipes/server-rendering/#security-considerations
                const initialState = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
                    preloadedState
                ).replace(/</g, '\\u003c')}</script>`

                const extraChunks = extractAssets(manifest.files, modules).map(
                    c => `<script type="text/javascript" src="${c}"></script>`
                )
                // inject the rendered app into our html and send it
                return res.send(
                    htmlData
                        .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
                        .replace('</body>', `${extraChunks.join('')} ${initialState} </body>`)
                )
            })
            .catch(err => {
                console.error('err', err)
                return res.status(404).end()
            })
    })
}
