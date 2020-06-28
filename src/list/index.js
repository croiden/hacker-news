// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Header from './header'
import Item from './item'

import { type ThemeType } from '../types'

const Container: ThemeType = styled.div`
    border-bottom: 4px solid #f98335;
    margin-bottom: 10px;
`
const ListItems = styled.ul`
    margin: 0;
    padding: 0;
    background: #f6f6ef;
    li:nth-child(odd) {
        background: #e0e0e0;
    }
`
const Navigation = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 36px;
    padding: 10px;
    span {
        padding-right: 10px;
        color: #ff6600;
        font-weight: bold;
    }
`

const Empty = styled.div`
    display: flex;
    justify-content: center;
    height: 46px;
    align-items: center;
    font-style: italic;
    color: grey;
`

type Props = {
    page?: number,
    items?: Array<Object>,
}
export const List = ({ page = 0, items = [] }: Props) => {
    return (
        <Container>
            <Header />
            {items.length ? (
                <>
                    <ListItems>
                        {items.map((item: Object) => {
                            return <Item key={item.objectID} {...item} />
                        })}
                    </ListItems>
                    <Navigation>
                        <a href={`/?page=${page - 1}`}>
                            <span>Previous</span>
                        </a>
                        <span>|</span>
                        <a href={`/?page=${page + 1}`}>
                            <span>Next</span>
                        </a>
                    </Navigation>
                </>
            ) : (
                <Empty>{'No data found, you may have exceeded the page limit.'}</Empty>
            )}
        </Container>
    )
}

const mapStateToProps = ({ items, page }: Object): Object => ({
    items: Object.keys(items).map(id => items[id]),
    page: page,
})
// $FlowFixMe
export default connect(mapStateToProps)(List)
