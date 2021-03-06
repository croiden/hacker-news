// @flow
import React from 'react'
import styled from 'styled-components'

import { type ThemeType } from '../types'

const Header: ThemeType = styled.div`
    display: flex;
    min-height: 36px;
    align-items: center;
    padding: 10px;
    background: #ff6600;
    position: sticky;
    top: 0;
    font-weight: bold;
`

const Column = styled.div`
    padding-right: 10px;
    width: 84px;
    min-width: 84px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    @media (max-width: 768px) {
        width: 60px;
        min-width: 60px;
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
