// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Header from './header'
import Item from './item'

const ListItems = styled.ul`
    margin: 0;
    padding: 0;
    background: #f6f6ef;
    li:nth-child(odd) {
        background: #e0e0e0;
    }
`
type Props = {
    page?: number,
    items?: Array<Object>,
}
export const List = ({ page = 0, items = [] }: Props) => {
    return (
        <>
            <Header />
            {items.length ? (
                <>
                    <ListItems>
                        {items.map((item: Object) => {
                            return <Item key={item.objectID} {...item} />
                        })}
                    </ListItems>
                    <a href={`/?page=${page - 1}`}>Previous</a>
                    <a href={`/?page=${page + 1}`}>Next</a>
                </>
            ) : (
                <div>{'No data found'}</div>
            )}
        </>
    )
}

const mapStateToProps = ({ items, page }: Object): Object => ({
    items: Object.keys(items).map(id => items[id]),
    page: page,
})
// $FlowFixMe
export default connect(mapStateToProps)(List)
