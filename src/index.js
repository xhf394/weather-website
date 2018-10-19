import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CurrentLocation from './Components/CurrentLocation';
import SearchBar from './Components/SearchBar';
import NextThreeDaysTemperature from './Components/NextThreeDaysTemperature';
import TodayTemperature from './Components/TodayTemperature';






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
                    Long: position.coords.longitude,
                });
            },
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
        )
    }
    
    render() {

        return (
            <div className="container">
                <div className="header">
                    <CurrentLocation
                        location={this.props.location}/>
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

