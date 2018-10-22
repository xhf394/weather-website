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
                Lat: 'Loading',
                Long: 'Loading'
        }
    }

    componentDidMount (){
        //const that = this;
        navigator.geolocation.getCurrentPosition(
            function (position) {
                this.setState({
                        Lat: position.coords.latitude,
                        Long: position.coords.longitude
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
            {timeout: 5000,
            maximumAge: 60*1000*2}
        );
    }

    getWeather = async (e) => {
        e.preventDefault();
        const Lat = this.state.Lat;
        const Long = this.state.Long;
        const api_call = await fetch(`https://samples.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml&appid=b6907d289e10d714a6e88b30761fae22`);
        const data = await api_call.json();
        console.log(data);
    }
    
    render() {

        return (
            <div className="container">
                <div className="header">
                    <CurrentLocation
                        getweather={this.getWeather}
                        lat = {this.state.Lat}
                        long = {this.state.Long}
                        />
                    <SearchBar />
                </div>
            <div className="body">
                <p>"this is body"</p>
                <TodayTemperature />
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

