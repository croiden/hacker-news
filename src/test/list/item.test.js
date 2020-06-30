import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'

import Item from '../../list/item'

afterEach(cleanup)

const props = {
    objectID: '17570029',
    title: 'Farewell, Google Maps',
    story_text: null,
    num_comments: 527,
    points: 1747,
    url: 'https://www.inderapotheke.de/blog/farewell-google-maps',
    author: 'ScottWRobinson',
    created_at: '2018-07-19T20:36:38.000Z',
    onUpVote: () => {},
    onHide: () => {},
}

describe('Item Component snapshot', () => {
    it('Item snapshot', () => {
        const { asFragment } = render(<Item {...props} />)
        expect(asFragment()).toMatchSnapshot()
    })
})

describe('Testing Item Component', () => {
    it('should invoke the onUpVote on click of vote button', () => {
        const handleUpVote = jest.fn()
        const { getByLabelText } = render(<Item {...props} onUpVote={handleUpVote} />)
        expect(getByLabelText('up vote')).toBeDefined()

        fireEvent.click(getByLabelText('up vote'))
        expect(handleUpVote).toHaveBeenCalled()
        expect(handleUpVote).toHaveBeenCalledWith('17570029')
    })

    it('should invoke the onHide on click of hide button', () => {
        const handleHide = jest.fn()
        const { getByText } = render(<Item {...props} onHide={handleHide} />)
        expect(getByText('Hide')).toBeDefined()

        fireEvent.click(getByText('Hide'))
        expect(handleHide).toHaveBeenCalled()
        expect(handleHide).toHaveBeenCalledWith('17570029')
    })
})
