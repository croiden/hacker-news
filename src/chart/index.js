// @flow
import React from 'react'
import styled from 'styled-components'
// $FlowFixMe
import { Line } from 'react-chartjs-2'
import { connect } from 'react-redux'

import { type ThemeType } from '../types'

const Container: ThemeType = styled.div`
    border-bottom: 4px solid #f98335;
    margin-bottom: 10px;
    padding: 20px;
`
type Props = {
    objectIds: Array<string>,
    points: Array<number>,
}
export const Chart = ({ objectIds, points }: Props) => {
    const data = {
        labels: objectIds,
        datasets: [
            {
                label: 'Vote counts',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(255, 102, 0,0.4)',
                borderColor: 'rgba(255, 102, 0,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(255, 102, 0,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(255, 102, 0,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: points,
            },
        ],
    }
    return (
        <Container>
            <Line data={data} />
        </Container>
    )
}

const mapStateToProps = ({ items, page }: Object): Object => {
    const validItems = Object.keys(items).filter(id => !items[id].hidden)
    return {
        objectIds: validItems,
        points: validItems.map(id => items[id].points),
    }
}

// $FlowFixMe
export default connect(mapStateToProps)(Chart)
