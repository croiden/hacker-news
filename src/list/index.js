// @flow
import React from 'react'
import { connect } from 'react-redux'

type Props = {
    page?: number,
    items?: Array<Object>,
}
export const List = ({ page = 0, items = [] }: Props) => {
    return items.length ? (
        <>
            <ul>
                {items.map((item: Object) => {
                    return <li key={item.objectID}>{item.title}</li>
                })}
            </ul>
            <a href={`/?page=${page - 1}`}>Previous</a>
            <a href={`/?page=${page + 1}`}>Next</a>
        </>
    ) : (
        <div>{'Loading Hacker news...'}</div>
    )
}

const mapStateToProps = ({ items, page }: Object): Object => ({
    items: Object.keys(items).map(id => items[id]),
    page: page,
})
// $FlowFixMe
export default connect(mapStateToProps)(List)
