// @flow
import React from 'react'
import Loadable from 'react-loadable'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
    }
    body {
        background:#efefef;
        font-family: ${props => props.theme.fontFamily};
        margin: 0;
        font-size: 10pt;
    }
    a:link{
      color:#000000;
      text-decoration:none;
    }
`
const Container = styled.div`
    @media (min-width: 1024px) {
        margin: 0 8%;
    }
`

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
        <ThemeProvider theme={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>
            <GlobalStyle />
            <Container>
                <AsyncListComponent />
                <AsyncChartComponent />
            </Container>
        </ThemeProvider>
    )
}
