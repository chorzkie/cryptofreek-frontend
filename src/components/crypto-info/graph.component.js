import React from 'react';
import { Line } from 'react-chartjs-2';
import './graph.styles.scss';



const Graph = (props) => {
    
    const { graphData } = props;

    return (
    
        <div className='graph'>
            <Line
                options={{
                    responsive: true,
                    legend: {
                        display: false
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false
                    },
                    hover: {
                        mode: 'index',
                        intersect: false
                    },
                    scales: {
                        xAxes: [{ display: false }],
                        yAxes: [{ display: false }]
                    }
                }}
                data={graphData}
            />
        </div>
    )
}


export default Graph;
