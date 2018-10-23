import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const SearchBar = (props) => {
    return (
        <div className="search-bar">
        <form onSubmit={props.getweather}>
        <input type="text" placeholder="Search City" />
        <button > Search </button>
        </form>
        </div>
)

}

export default SearchBar;