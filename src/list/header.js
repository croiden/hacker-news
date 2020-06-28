// @flow
import React from 'react'
import styled from 'styled-components'

const Header = styled.div`
    display: flex;
    min-height: 36px;
    background: #dadada;
    align-items: center;
    padding: 0px 10px;
    background: #ff6600;
    position: sticky;
    top: 0;
    font-weight: bold;
`

const Column = styled.div`
    padding-right: 10px;
    min-width: 90px;
    @media (max-width: 768px) {
        width: 60px;
        max-width: 60px;
        min-width: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`
const TextColumn = styled.div`
    padding-right: 10px;
    min-width: 90px;
`

export default function header() {
    return (
        <Header>
            <Column>{'Comments'}</Column>
            <Column>{'Vote Count'}</Column>
            <Column>{'Up Vote'}</Column>
            <TextColumn>{'News Details'}</TextColumn>
        </Header>
    )
}
