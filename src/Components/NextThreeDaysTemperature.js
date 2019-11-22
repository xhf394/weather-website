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
            <div className="col-12 mb-3 text-center"> <h5>Weather in the Next Three to Five Days</h5> </div>
			<div className="col-4 col-sm-12">
              <div className="card text-center border-primary forecast-item-box">
                <div className="row justify-content-center forecast-item-fsize">
                  <div className="col-10 col-sm-5 align-self-center"> {nextOneDay} </div>
                  <div className="col-10 col-sm-4"><img id="wicon" src={iconurl1} alt="..." /></div>
                  <div className="col-8 col-sm-3 align-self-center">{`${nextOneDayTemp}°C`}</div>
                </div>
              </div>
            </div>                
            <div className="col-4 col-sm-12">
              <div className="card text-center border-primary forecast-item-box">
                <div className="row justify-content-center forecast-item-fsize">
                  <div className="col-10 col-sm-5 align-self-center"> {nextTwoDay} </div>
                  <div className="col-10 col-sm-4"><img id="wicon" src={iconurl2} alt="..." /></div>
                  <div className="col-8 col-sm-3 align-self-center">{`${nextTwoDayTemp}°C`}</div>
                </div> 
              </div>                               
            </div>
            <div className="col-4 col-sm-12">
              <div class="card text-center border-primary forecast-item-box">
                <div className="row justify-content-center forecast-item-fsize">
                  <div className="col-10 col-sm-5 align-self-center"> {nextThreeDay} </div>
                  <div className="col-10 col-sm-4"><img id="wicon" src={iconurl3} alt="..." /></div>
                  <div className="col-8 col-sm-3 align-self-center">{`${nextThreeDayTemp}°C`}</div>
                </div> 
              </div>                          
            </div>  
          </div>
        )
    }
}

export default NextThreeDaysTemperature;