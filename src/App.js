// @flow
import React, { lazy, useState, Suspense, useEffect } from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { connect } from 'react-redux'

import List from './list'

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

const ChartComponent = lazy(() => import(`./chart`))

type Props = {
    hasItems: boolean,
}
export const App = ({ hasItems = false }: Props) => {
    const [showChart, setShowChart] = useState(false)

    useEffect(() => {
        if (hasItems) {
            const isScrollAtTheBottom = () => {
                if (
                    document.body &&
                    window.innerHeight + window.scrollY >= document.body.offsetHeight
                ) {
                    // you're at the bottom of the page
                    setShowChart(true)
                }
            }
            isScrollAtTheBottom()

            window.addEventListener('scroll', isScrollAtTheBottom)
            return () => {
                window.removeEventListener('scroll')
            }
        }
    }, [hasItems])

    return (
        <ThemeProvider theme={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>
            <GlobalStyle />
            <Container>
                <List />
                {showChart && (
                    <Suspense fallback={<div>Loading chart...</div>}>
                        <ChartComponent />
                    </Suspense>
                )}
            </Container>
        </ThemeProvider>
    )
}

const mapStateToProps = ({ items }: Object): Object => ({
    hasItems: Boolean(Object.keys(items).length),
})
// $FlowFixMe
export default connect(mapStateToProps)(App)
