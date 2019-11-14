import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './SearchBar.css';

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
    const { testList } = this.props;
    const userInput = e.currentTarget.value;

    //Fiter suggestions that don't contain the user's input
    const filteredSuggestions = testList.filter(
      item => 
        item.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    //update the userinput
    //filter suggestions
    //reset active suggestion index
    //make sure suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,	
    })
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

    if(showSuggestions && userInput) {
      if(filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) =>{
              //active suggestion style
              let className;

              if(activeSuggestion === index) {
                className="suggestion-active";
              }

              return(
                <li
                  className={className}
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

    return (
        <div>
        <form onSubmit={this.props.getweather}>
            <input
              type="text" 
              placeholder="City" 
              name="city"
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              value={userInput} 
            />
            {suggestionsListComponent}
            <input type="text" placeholder="Country" name="country"/>
            <button > Search </button>
        </form>
        </div>
    )
   }
}

export default SearchBar;