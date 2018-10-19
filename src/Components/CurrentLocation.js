import React, {Component} from 'react';
import ReactDOM from 'react-dom';


const CurrentLocation = (props) => {
    return (
        <div className="current-location">
        <p>Current Location
    {props.location}</p>
    </div>
)
}


export default CurrentLocation;