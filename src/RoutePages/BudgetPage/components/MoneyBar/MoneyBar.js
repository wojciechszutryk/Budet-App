import React from 'react';
import {Bar} from 'react-chartjs-2';

const MoneyBar = ({chartData, text}) => {

    const defaultProps = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'right',
    }

    return (
        <div className="chart">
            <Bar
                data={chartData}
                options={{
                    title:{
                        text: text,
                        fontSize: 25
                    },
                    legend:{
                        display: defaultProps.displayLegend,
                        position: defaultProps.legendPosition
                    }
                }}
            />
        </div>
    )
}

export default MoneyBar;