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
                error: undefined

        }
    }

    componentDidMount () {
        //const that = this;
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;


                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}`)
                   .then(response => response.json())
                    .then(data =>
                        this.setState({
                            city: data.name,
                            temperature: data.main.temp,
                            country: data.sys.country,
                            humidity: data.main.humidity,
                            description: data.weather[0].description,
                            icon: data.weather[0].icon,
                            error:""
                        })
                    );



                //console.log(url);
                this.setState({
                    lat: lat,
                    long: long,
                });
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
                <NextThreeDaysTemperature />
            </div>
            </div>
        )
    }
}

ReactDOM.render(<WeatherApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

