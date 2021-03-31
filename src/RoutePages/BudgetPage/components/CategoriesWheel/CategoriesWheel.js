import React from 'react';
import {Doughnut} from 'react-chartjs-2';

const CategoriesWheel = ({chartData, text, lightTheme}) =>{

    return (
        <div className="chart">
            <Doughnut
                data={chartData}
                options={{
                    title:{
                        display: true,
                        text: text,
                        fontSize: 25,
                        fontColor: (lightTheme ? "#000" : "#fff"),
                    },
                    legend:{
                        display:true,
                        position: (window.innerWidth<768 ? 'right' : 'bottom'),
                        labels: {
                            fontColor: (lightTheme ? "#000" : "#fff"),
                            fontSize: 16
                        }
                    },
                    cutoutPercentage: 30,
                }}
            />
        </div>
    )

}

export default CategoriesWheel;