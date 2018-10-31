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
                nextOneDay: undefined,
                nextTwoDay: undefined,
                nextDay: [
                        {nextDay: undefined}
                ]
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
                            forecastweather: data,
                            nextTwoDay: data.list[16].main.temp
                         })
                    ); 

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
                            nextOneDay: data.list[8].main.temp,
                            nextDay: [data.list],
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

    forcastWeather = async(e) =>{
        e.preventDefault();
        const city = this.state.city;
        const country = this.state.country;    
        const api_call = await fetch(`api.openweathermap.org/data/2.5/forecast?q=${city},${country}&APPID=${API_KEY}`);
        const data = await api_call.json();
        console.log(data);
    }


    
    render() {

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
                nextOneDay = {this.state.nextOneDay}
                nextTwoDay = {this.state.nextTwoDay}
                nextDay = {this.state.nextDay}

                 />
            </div>
            </div>
        )
    }
}

ReactDOM.render(<WeatherApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA 
