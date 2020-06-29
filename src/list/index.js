// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Header from './header'
import Item from './item'

import { type ThemeType } from '../types'
import { incrementVote, hideItem } from '../store/actions'

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
    > span {
        opacity: 0.5;
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
    page: number,
    items: Array<Object>,
    totalPages: number,
    incrementVote: (objectID: number) => void,
    hideItem: (objectID: number) => void,
}
export const List = ({ page, items, totalPages, incrementVote, hideItem }: Props) => {
    return (
        <Container>
            <Header />
            {items.length ? (
                <>
                    <ListItems>
                        {items.map((item: Object) => {
                            return (
                                <Item
                                    key={item.objectID}
                                    {...item}
                                    onUpVote={incrementVote}
                                    onHide={hideItem}
                                />
                            )
                        })}
                    </ListItems>
                    <Navigation>
                        {page > 0 ? (
                            <a href={`/?page=${page - 1}`}>
                                <span>Previous</span>
                            </a>
                        ) : (
                            <span>Previous</span>
                        )}
                        <span>|</span>
                        {page < totalPages - 1 ? (
                            <a href={`/?page=${page + 1}`}>
                                <span>Next</span>
                            </a>
                        ) : (
                            <span>Next</span>
                        )}
                    </Navigation>
                </>
            ) : (
                <Empty>{'No data found, you may have exceeded the page limit.'}</Empty>
            )}
        </Container>
    )
}

const mapStateToProps = ({ items, page, totalPages }: Object): Object => ({
    items: Object.keys(items).map(id => items[id]),
    page,
    totalPages,
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        incrementVote: id => dispatch(incrementVote(id)),
        hideItem: id => dispatch(hideItem(id)),
    }
}
// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(List)
