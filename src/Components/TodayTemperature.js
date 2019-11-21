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
              <div className="card border-warning">
                <div className="card-header">
                  <h5> Weather in <em>{city} </em> <img id="wicon" src={iconurl} alt="..." /> </h5>  
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">{`Temperature: ${temperature} °C`}  </li>
                  <li className="list-group-item"> Humidity: {humidity} % </li>
                  <li className="list-group-item d-none"> Description: {description} </li>
                </ul>
              </div>
            </div>




          </div>
        )
    }
}


export default TodayTemperature;