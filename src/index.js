import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CurrentLocation from './Components/CurrentLocation';
import SearchBar from './Components/SearchBar';
import NextThreeDaysTemperature from './Components/NextThreeDaysTemperature';
import TodayTemperature from './Components/TodayTemperature';



const API_KEY = "9b8ba16944f1b9eafdf4b5e434c3511a";


class WeatherApp extends React.Component {
    constructor(props){
        super (props);
        this.state = {
                lat: 'Loading',
                long: 'Loading',
                temperature: undefined,
                city: "undefined",
                country: undefined,
                humidity: undefined,
                description: undefined,
                icon: undefined,
                error: undefined,
                forcastweather: undefined,
                nextOneDayTemp: undefined,
                nextTwoDayTemp: undefined,
                nextThreeDayTemp: undefined,
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

                // fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=${API_KEY}`)
                //    .then(response => response.json())
                //     .then(data =>
                //          this.setState({
                //             forecastweather: data,
                            
                //          })
                //     ); 

                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=${API_KEY}`)
                   .then(response => response.json())
                    .then(data =>
                        this.setState({
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


                
                //console.log(url);
               
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
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        //const lat = this.state.lat;
        //const long = this.state.long;
        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}`);
        const data = await api_call.json();
        console.log(data);
        this.setState({
            lat: data.coord.lat,
            long: data.coord.lon,
            temperature: data.main.temp,
            city: data.name,
            country: data.sys.country,
            humidity: data.main.humidity,
            icon: data.weather[0].icon,
            description: data.weather[0].description,
            error:""
        })
    }
    
    render() {
        const nextOneDay = getDate().nextOneDay;
        const nextTwoDay = getDate().nextTwoDay;
        const nextThreeDay = getDate().nextThreeDay;    

        return (
            <div className="container">
                <div className="header">
                    <CurrentLocation
                        lat = {this.state.lat}
                        long = {this.state.long}
                        city = {this.state.city}
                        />
                    <SearchBar
                     getweather = {this.getWeather}
                    />
                </div>
            <div className="body">
                <p>"this is body"</p>
                <TodayTemperature
                city = {this.state.city}
                temperature = {this.state.temperature}
                humidity = {this.state.humidity}
                icon = {this.state.icon}
                description = {this.state.description}
                />
                <NextThreeDaysTemperature
                city = {this.state.city}
                country = {this.state.country}
                nextOneDayTemp = {this.state.nextOneDayTemp}
                nextTwoDayTemp = {this.state.nextTwoDayTemp}
                nextThreeDayTemp = {this.state.nextThreeDayTemp}
                nextOneDay = {nextOneDay}
                nextTwoDay = {nextTwoDay}
                nextThreeDay = {nextThreeDay}
                icon1 = {this.state.icon1}
                icon2 = {this.state.icon2}
                icon3 = {this.state.icon3}
                 />
                }
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