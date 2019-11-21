import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class SplineChart extends Component {

   

	render() {

		const { forecastList, city } = this.props;
        
        //extract date and temperature for five days forecast
        const dataList = forecastList.filter((item,index) => {
          //only take 10 pieces from whole array
          return index % 4 === 0;     
        }).map((item, index) => {
          return({x: new Date(item.dt_txt), y: Math.round(item.main.temp - 273.15)});	
        });

         
        // const dataPoints = (dataList && datalist.map((item,index) =>{
        //  return item.clouds.dt
        // }))||[];       

        // {x: new Date(item.clouds.dt), y: Math.round(item.temp - 273.15)}

        console.log(dataList);

		const options = {
			animationEnabled: true,
			title:{
				text: `Weather Forecast -- ${city} City`
			},
			axisX: {
				valueFormatString: "DDD"
			},
			axisY: {
				title: "Temperature in ℃",
				prefix: "℃",
				includeZero: false
			},
			data: [{
				yValueFormatString: "$#,###",
				xValueFormatString: "DDDD",
				type: "spline",
				dataPoints: dataList,
			}]
		}
		
		return (
		  <div>
            {forecastList&&
             dataList&&
             city&&
		     <div>
		       <div></div>
			   <CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			   />
			   {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		    </div>}
		  </div>
		);
	}
}

export default SplineChart;                           