import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class NextThreeDaysTemperature extends  React.Component {

	
    render () {

        const {
          icon1, 
          icon2, 
          icon3,
          nextOneDay,
          nextOneDayTemp,
          nextTwoDay,
          nextTwoDayTemp,
          nextThreeDay,
          nextThreeDayTemp, 
        } = this.props;
        const iconurl1 = "http://openweathermap.org/img/w/"+ icon1 +".png";
        const iconurl2 = "http://openweathermap.org/img/w/"+ icon2 +".png";
        const iconurl3 = "http://openweathermap.org/img/w/"+ icon3 +".png";


        return (            
          <div className="row">
            <div className="col-12"> <h5>Weather in the Next Three Days</h5> </div>
			<div className="col-4 ">
              <div className="card text-center">
                <div className="row justify-content-center ">
                  <div className="col-10"> {nextOneDay} </div>
                  <div className="col-10"><img id="wicon" src={iconurl1} alt="..." /></div>
                  <div className="col-8">{`${nextOneDayTemp}°C`}</div>
                </div>
              </div>
            </div>                
            <div className="col-4">
              <div className="card text-center">
                <div className="row justify-content-center">
                  <div className="col-10"> {nextTwoDay} </div>
                  <div className="col-10"><img id="wicon" src={iconurl2} alt="..." /></div>
                  <div className="col-8">{`${nextTwoDayTemp}°C`}</div>
                </div> 
              </div>                               
            </div>
            <div className="col-4">
              <div class="card text-center">
                <div className="row justify-content-center">
                  <div className="col-10"> {nextThreeDay} </div>
                  <div className="col-10"><img id="wicon" src={iconurl3} alt="..." /></div>
                  <div className="col-8">{`${nextThreeDayTemp}°C`}</div>
                </div> 
              </div>                          
            </div>  
          </div>
        )
    }
}

export default NextThreeDaysTemperature;