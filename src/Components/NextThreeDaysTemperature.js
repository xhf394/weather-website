import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class NextThreeDaysTemperature extends  React.Component {

	
    render () {

        return (
            < div >
            < p > "next three days temperature"; <br />
			
            {this.props.nextOneDay}
            < /p>
            < /div>
    )
    }
}

export default NextThreeDaysTemperature;