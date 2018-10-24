import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class TodayTemperature extends React.Component {

    render () {
        return (
            <div>
            <p>"today's temperature " <br/>
             icon: {this.props.icon}<br />
             temperature: {this.props.temperature}<br />
             humidity: {this.props.humidity}<br />
             description: {this.props.description}


            </p>
            </div>
    )
    }
}

export default TodayTemperature;