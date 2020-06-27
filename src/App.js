// @flow
import React from 'react'
import Loadable from 'react-loadable'

const AsyncListComponent = Loadable({
    loader: () => import(/* webpackChunkName: "listChunk" */ './list'),
    loading: () => <div>loading...</div>,
    modules: ['listChunk'],
})
const AsyncChartComponent = Loadable({
    loader: () => import(/* webpackChunkName: "chartChunk" */ './chart'),
    loading: () => <div>loading...</div>,
    modules: ['chartChunk'],
})

export default () => {
    return (
        <div>
            <div>{'Hacker News'}</div>
            <AsyncListComponent />
            <AsyncChartComponent />
        </div>
    )
}
