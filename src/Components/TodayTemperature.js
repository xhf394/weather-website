import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class TodayTemperature extends React.Component {

    render () {
       
      const { 
        icon, 
        city, 
        temperature,
        humidity,
        description,
      } = this.props; 

      const iconurl = "http://openweathermap.org/img/w/"+ icon +".png";

        return (
          <div className="row">
            <div className="col-12">
              <h5> Weather in <em>{city} </em> </h5>  
            </div>

            <div id="icon" className="col-12">
                <img id="wicon" src={iconurl} alt="Weather icon" />
                <span>{`${temperature} °C`}</span>
            </div>
            <div className="col-12">
              humidity: {humidity}<br />
             description: {description}
             </div>
          </div>
        )
    }
}


export default TodayTemperature;