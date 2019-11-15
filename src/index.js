import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CurrentLocation from './Components/CurrentLocation';
import SearchBar from './Components/SearchBar';
import NextThreeDaysTemperature from './Components/NextThreeDaysTemperature';
import TodayTemperature from './Components/TodayTemperature';
import SplineChart from './Components/SplineChart';


const API_KEY = "9b8ba16944f1b9eafdf4b5e434c3511a";


class WeatherApp extends React.Component {
    constructor(props){
        super (props);
        this.state = {
            data: null,
                lat: 'Loading',
                long: 'Loading',
                temperature: "",
                city: "undefined",
                country: undefined,
                humidity: undefined,
                description: undefined,
                icon: undefined,
                error: undefined,
                forcastweather: undefined,
                nextOneDayTemp: null,
                nextTwoDayTemp: null,
                nextThreeDayTemp: null,
                icon1: undefined,
                icon2: undefined,
                icon3:undefined,
                // nextDay: [
                //         {nextDay: undefined}
                // ]
        }
    }

    componentDidMount () {
        //const that = this;
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;

                 this.setState({
                    lat: lat,
                    long: long,
                });

                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=${API_KEY}`)
                   .then(response => response.json())
                    .then(data =>
                        this.setState({
                            data: data,
                            city: data.city.name,
                            temperature: data.list[1].main.temp,
                            country: data.city.country,
                            humidity: data.list[1].main.humidity,
                            description: data.list[1].weather[0].description,
                            icon: data.list[1].weather[0].icon,
                            nextOneDayTemp: data.list[8].main.temp,
                            //nextDay: [data.list],
                            nextTwoDayTemp: data.list[16].main.temp,
                            nextThreeDayTemp: data.list[24].main.temp,
                            icon1:data.list[8].weather[0].icon,
                            icon2:data.list[16].weather[0].icon,
                            icon3:data.list[24].weather[0].icon,    
                            error:""
                        })
                    );               
            }.bind(this),
            function (error) {
                const errorTypes = {
                    1: '位置服务被拒绝',
                    2: '获取不到位置信息',
                    3: '获取信息超时'
                };
                alert(errorTypes[error.code] + ": 不能确定你的当前地理位置");
            },
            {
                timeout: 5000,
                maximumAge: 60 * 1000 * 2
            }
        );
    }

    getWeather = async (e) => {
        e.preventDefault();
        // const city = e.target.elements.city.value;
        // const country = e.target.elements.country.value;
        //const lat = this.state.lat;
        //const long = this.state.long;
        
        //store city and country
        const cityCombinedCountry = e.target.city.value;
        const combinedArr = cityCombinedCountry.split(",");
        const city = combinedArr[0];
        const country = combinedArr[1];


        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&APPID=${API_KEY}`);
        const data = await api_call.json();
        if(city && country) {
        this.setState({
            data: data,
                            city: data.city.name,
                            temperature: data.list[1].main.temp,
                            country: data.city.country,
                            humidity: data.list[1].main.humidity,
                            description: data.list[1].weather[0].description,
                            icon: data.list[1].weather[0].icon,
                            nextOneDayTemp: data.list[8].main.temp,
                            //nextDay: [data.list],
                            nextTwoDayTemp: data.list[16].main.temp,
                            nextThreeDayTemp: data.list[24].main.temp,
                            icon1:data.list[8].weather[0].icon,
                            icon2:data.list[16].weather[0].icon,
                            icon3:data.list[24].weather[0].icon,    
                            error:""
        })
        }
    }
    
    render() {
        const nextOneDay = getDate().nextOneDay;
        const nextTwoDay = getDate().nextTwoDay;
        const nextThreeDay = getDate().nextThreeDay;
        let temperature = convertTemp(this.state.temperature);
        let nextOneDayTemp = convertTemp(this.state.nextOneDayTemp);
        let nextTwoDayTemp = convertTemp(this.state.nextTwoDayTemp);
        let nextThreeDayTemp = convertTemp(this.state.nextThreeDayTemp);   
        
        console.log(temperature);
        console.log(this.state.nextTwoDayTemp);
        console.log(this.state.data);
        
        return (
         	<div className="bg-image page-view">
	          <div className="container" >
	            <div className="header"> 
	              <div className="row">
	                <div className="col-12">
	                  <h2>Weather forecast</h2>
	                </div>
	                <div className="col-12">
	                  <SearchBar
	                    getweather = {this.getWeather}
	                  />
	                </div>
	              </div>
	            </div>
	                <div>
	                    <CurrentLocation
	                        lat = {this.state.lat}
	                        long = {this.state.long}
	                        city = {this.state.city}
	                        />
	                    
	                </div>
	            <div className="body">
                  <div>
	                <p>"this is body"</p>
	                <TodayTemperature
	                city = {this.state.city}
	                temperature = {temperature}
	                humidity = {this.state.humidity}
	                icon = {this.state.icon}
	                description = {this.state.description}
	                />
	                <NextThreeDaysTemperature
	                city = {this.state.city}
	                country = {this.state.country}
	                nextOneDayTemp = {nextOneDayTemp}
	                nextTwoDayTemp = {nextTwoDayTemp}
	                nextThreeDayTemp = {nextThreeDayTemp}
	                nextOneDay = {nextOneDay}
	                nextTwoDay = {nextTwoDay}
	                nextThreeDay = {nextThreeDay}
	                icon1 = {this.state.icon1}
	                icon2 = {this.state.icon2}
	                icon3 = {this.state.icon3}
	                 />
                  </div>
                  <SplineChart />
	            </div>
	          </div>
	        </div>  
        )
    }
}

ReactDOM.render(<WeatherApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA 
function getDate(){
            const myDate = new Date();                                      
            // const weekdayCount = [{Sunday: 0}, {Monday: 1}, {Tuesday: 2}, {Wednesday: 3}, {Thursday: 4}, {Friday: 5}, {Saturday:6}];
            const todayDateNumber = myDate.getDay();

            const weekdayCount = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday","Monday","Tuesday"];
            console.log(weekdayCount[0]);


            let todayDate = "";
            let nextOneDay = "";
            let nextTwoDay = "";
            let nextThreeDay = "";

            for (let i = 0; i <= 6; i++){
                if(todayDateNumber == i){
                    todayDate = weekdayCount[i];
                    nextOneDay = weekdayCount[i+1];
                    nextTwoDay = weekdayCount[i+2];
                    nextThreeDay = weekdayCount[i+3];   
                }
            }

            console.log(todayDate, nextOneDay, nextTwoDay, nextThreeDay);
            return {todayDate: todayDate, nextOneDay: nextOneDay, nextTwoDay: nextTwoDay, nextThreeDay: nextThreeDay}   
        }

function convertTemp(temp) {
    let convertTempT;
    if(temp){
    	convertTempT = temp - 273.15;
        return Math.round(convertTempT)  
    };
}        