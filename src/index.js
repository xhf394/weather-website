import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class WeatherApp extends React.Component {

    render() {
        return (
            <div className="container">
            <div className="header">
            <form>
            <input type="text" placeholder="Search City" />
            </form>
            
            </div>
            </div>
        )
    }
}

ReactDOM.render(<WeatherApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

