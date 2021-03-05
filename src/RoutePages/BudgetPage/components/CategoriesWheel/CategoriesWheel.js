import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';

class CategoriesWheel extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData:props.chartData
        }
    }

    static defaultProps = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'right',
        location:'City'
    }

    render(){
        return (
            <div className="chart">
                <Doughnut
                    data={this.props.chartData}
                    options={{
                        title:{
                            display:this.props.displayTitle,
                            text:this.props.text,
                            fontSize:25
                        },
                        legend:{
                            display:this.props.displayLegend,
                            position:this.props.legendPosition
                        },
                        cutoutPercentage: 30,
                    }}
                />
            </div>
        )
    }
}

export default CategoriesWheel;