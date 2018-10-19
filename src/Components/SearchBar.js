import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const SearchBar = () => {
    return (
        <div className="search-bar">
        <form>
        <input type="text" placeholder="Search City" />
        <button > Search </button>
        </form>
        </div>
)

}

export default SearchBar;