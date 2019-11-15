import React, {Component} from 'react';
import ReactDOM from 'react-dom';


const CurrentLocation = (props) => {


    return (
        <div className="current-location" style = {{color: 'red'}} >
            {props.city && props.lat && props.long &&
            	<p>
                Location: {props.city} <br/>
                Latitude: {props.lat} <br />
                Longitude: {props.long}
                </p>}
         </div>
)
}


export default CurrentLocation;

