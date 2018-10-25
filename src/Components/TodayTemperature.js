import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class TodayTemperature extends React.Component {

    render () {

        const iconcode = this.props.icon;
        const iconurl = "http://openweathermap.org/img/w/"+ iconcode +".png";

        console.log(iconurl);

        return (
            <div>
            "today's temperature " <br/>
            <div id="icon">
                <img id="wicon" src={iconurl } alt="Weather icon" />
            </div>
             icon: {this.props.icon}<br />
             temperature: {this.props.temperature}<br />
             humidity: {this.props.humidity}<br />
             description: {this.props.description}
            </div>
        )
    }
}


export default TodayTemperature;