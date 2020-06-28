// @flow
import React from 'react'
// $FlowFixMe
import { Line } from 'react-chartjs-2'
import { connect } from 'react-redux'

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
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: points,
            },
        ],
    }
    return (
        <div>
            <Line data={data} />
        </div>
    )
}

const mapStateToProps = ({ items, page }: Object): Object => ({
    objectIds: Object.keys(items),
    points: Object.keys(items).map(id => items[id].points),
})
// $FlowFixMe
export default connect(mapStateToProps)(Chart)
