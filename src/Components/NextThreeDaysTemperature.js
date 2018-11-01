import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class NextThreeDaysTemperature extends  React.Component {

	
    render () {
        const iconcode1 = this.props.icon1;
        const iconurl1 = "http://openweathermap.org/img/w/"+ iconcode1 +".png";


        const iconcode2 = this.props.icon2;
        const iconurl2 = "http://openweathermap.org/img/w/"+ iconcode2 +".png";

        const iconcode3 = this.props.icon3;
        const iconurl3 = "http://openweathermap.org/img/w/"+ iconcode3 +".png";


        return (
            < div >
                 < p > "next three days temperature"; </p> <br />
			     <div>
                    {this.props.nextOneDay}
                    <img id="wicon" src={iconurl1} alt="Weather icon" />
                    {this.props.nextOneDayTemp}
                 </div>  
                 
                 <div>
                    {this.props.nextTwoDay}
                    <img id="wicon" src={iconurl2} alt="Weather icon" />
                    {this.props.nextTwoDayTemp}
                 
                 </div>
                 <div>
                    {this.props.nextThreeDay}
                    <img id="wicon" src={iconurl3} alt="Weather icon" />
                    {this.props.nextThreeDayTemp}
                 </div>  
            < /div>
    )
    }
}

export default NextThreeDaysTemperature;