import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './SearchBar.css';
import { CityListUpdate } from '../constants';

class SearchBar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      //The suggestion match the user's input
      filteredSuggestions: [],
      //whether or not the suggestion list is shown
      showSuggestions: false,
      //what the user has entered
      userInput: "",
    }

    //bind methods
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange(e) {
    const userInput = e.currentTarget.value;

    //Fiter suggestions that don't contain the user's input
    const filteredSuggestions = CityListUpdate.filter(
      item => 
        item.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    //update the userinput
    //filter suggestions
    //reset active suggestion index
    //make sure suggestions are shown

    if(userInput == "") {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        filteredSuggestions,
        userInput: "",
      });
    }
    else {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,	
    })
    }
  }


  //Event fired when the input value is changed
  onClick(e) {
    //update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText	
    })
  }
  
  //Event fired when the user presses a key down
  onKeyDown(e) {
    const { activeSuggestion, filteredSuggestions } = this.state;

    //user pressed the enter key, update the input
    //close the suggestion
    if(e.keyCode === 13) {
      this.setState({
      	activeSuggestion: 0,
      	filteredSuggestions: [],
      	showSuggestions: false,
      	userInput: filteredSuggestions[activeSuggestion],
      })	
    }
    
    //if user press the up arrow, decrement the index
    else if(e.keyCode === 38) {
      //already first one
      if(activeSuggestion === 0) {
      	return;
      }

      this.setState({
      	activeSuggestion: activeSuggestion - 1,
      }) 	
    }

    //if user press the down arrow, increment the index
    else if(e.keyCode === 40) {
      //already the last one
      if(activeSuggestion === filteredSuggestions.length - 1) {
      	return;
      }

      this.setState({
      	activeSuggestion: activeSuggestion + 1,
      })	
    }
  }

  render(){

    const {
      activeSuggestion,
      filteredSuggestions,
      showSuggestions,
      userInput	
    } = this.state;
    
    let suggestionsListComponent;
    
    const autoFillSpaceStyle = ['p-r', 'intro-mf'];

    if(showSuggestions && userInput) {
      if(filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="list-group list-group-autofill overflow-auto">
            {filteredSuggestions.map((suggestion, index) =>{
              //active suggestion style
              let className=['list-group-item', 'list-group-item-autofill'];

              if(activeSuggestion === index) {
                className.push('list-group-item-warning');
              }
              
              return(
                <li
                  className={className.join(' ')}
                  key={suggestion}
                  onClick={this.onClick}
                >
                  {suggestion}
                </li>
              )
            })}  
          </ul>
        )
      }
      else {
      	suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
      	)
      }	
    }

    if( showSuggestions ) {
      autoFillSpaceStyle.push('d-none');
    }

    return (
          <div className="row justify-content-center">
            <form onSubmit={this.props.getweather} className="col-10">
              <div className="row justify-content-center">
                <input
                type="text" 
                placeholder="City" 
                name="city"
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
                value={userInput} 
                className="col-8 col-lg-9"
                />
                <button className="col-3 col-lg-2 btn btn-secondary "> Search </button>
              </div>           
            </form>
            <div className="col-10">
              <div className="p-r">
                {suggestionsListComponent} 
              </div>
              <div className={autoFillSpaceStyle.join(' ')}></div>
            </div>
            
          </div>

        
    )
   }
}

export default SearchBar;