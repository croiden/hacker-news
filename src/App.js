// @flow
import React, { lazy, useState, Suspense, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { connect } from 'react-redux'

import useOnResize from './hooks/useOnResize'
import { isScrollAtTheBottom } from './utils'
import List from './list'

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
        outline-color:#ff6600;
    }
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background:#efefef;
        font-size:16px;
    }
    a:link{
      color:#000000;
      text-decoration:none;
    }
    @media (min-width:420px){
        body{
            font-size:12px;
        }
    }
`
const Container = styled.div`
    @media (min-width: 1024px) {
        margin: 0 8%;
    }
`

const ChartComponent = lazy(() => import(`./chart`))

type Props = {
    hasItems: boolean,
}
export const App = ({ hasItems = false }: Props) => {
    const [showChart, setShowChart] = useState(false)

    const checkScrollPosition = () => {
        isScrollAtTheBottom() && setShowChart(true)
    }
    useEffect(() => {
        if (hasItems) {
            checkScrollPosition()

            window.addEventListener('scroll', checkScrollPosition)
            return () => {
                window.removeEventListener('scroll')
            }
        }
    }, [hasItems])

    useOnResize(checkScrollPosition)

    return (
        <>
            <GlobalStyle />
            <Container>
                <List />
                {showChart && (
                    <Suspense fallback={<div>Loading chart...</div>}>
                        <ChartComponent />
                    </Suspense>
                )}
            </Container>
        </>
    )
}

const mapStateToProps = ({ items }: Object): Object => ({
    hasItems: Boolean(Object.keys(items).length),
})
// $FlowFixMe
export default connect(mapStateToProps)(App)
