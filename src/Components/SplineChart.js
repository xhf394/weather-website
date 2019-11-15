import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class SplineChart extends Component {
	render() {
		const options = {
			animationEnabled: true,
			title:{
				text: "Weather Forecast - 2017"
			},
			axisX: {
				valueFormatString: "DDD"
			},
			axisY: {
				title: "Sales (in USD)",
				prefix: "C",
				includeZero: false
			},
			data: [{
				yValueFormatString: "$#,###",
				xValueFormatString: "DDDD",
				type: "spline",
				dataPoints: [
					{ x: new Date("2019-11-15 09:00:00"), y: 25060 },
					{ x: new Date("2019-11-15 18:00:00"), y: 27980 },
					{ x: new Date("2019-11-15 21:00:00"), y: 42800 },
					{ x: new Date("2019-11-16 09:00:00"), y: 32400 },
					{ x: new Date("2019-11-16 18:00:00"), y: 35260 },
					{ x: new Date("2019-11-16 21:00:00"), y: 33900 },
					{ x: new Date("2019-11-17 09:00:00"), y: 40000 },
					{ x: new Date("2019-11-17 18:00:00"), y: 52500 },
					{ x: new Date("2019-11-18 06:00:00"), y: 32300 },
					{ x: new Date("2019-11-18 18:00:00"), y: 42000 },
					{ x: new Date("2019-11-19 06:00:00"), y: 37160 },
					{ x: new Date("2019-11-20 03:00:00"), y: 38400 }
				]
			}]
		}
		
		console.log(options.data[0]);
		return (

		<div>
			<h1>React Spline Chart</h1>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default SplineChart;                           