import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



const CurrentLocation = () => {
    return (
        <div className="current-location">
            <p>Current Location</p>
        </div>
    )
}

const SearchBar = () => {
    return (
        <div className="search-bar">
        <form>
            <input type="text" placeholder="Search City" />
            <button> Search </button>
        </form>
        </div>
    )

}
class Header extends  React.Component {

    render() {
        return (
            <div className="header">
                <CurrentLocation />
                <SearchBar />
            </div>
    )
    }
}

class NextThreeDaysTemperature extends  React.Component {

    render () {
        return (
            < div >
            < p > "next three days temperature" < /p>
            < /div>
    )
    }
}
class TodayTemperature extends React.Component {

    render () {
        return (
            <div>
              <p>"today's temperature "</p>
            </div>
        )
    }
}

class Body extends React.Component {

    render () {
        return (
            <div className="body">
                <p>"this is body"</p>
                <TodayTemperature />
                <NextThreeDaysTemperature />
            </div>
        )
    }
}
class WeatherApp extends React.Component {
    constructor(props){
        super (props);
        this.state = {
            
        }
    }
    render() {
        return (
            <div className="container">
            <Header />
            <Body />
            </div>
        )
    }
}

ReactDOM.render(<WeatherApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

