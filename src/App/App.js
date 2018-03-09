import React, { Component } from 'react';
import fetch from 'node-fetch';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom';

import Search from '../Search/Search';
import Result from '../Result/Result';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: null,
      searchResult: null,
      hasSearched: false
    };
  }

  handleInput(e) {
    this.setState({
      searchQuery: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const searchQuery = this.state.searchQuery;
    fetch('https://api.fullcontact.com/v3/person.enrich',{
      method: 'POST',
      // normally this should be hidden, but this is a free API key and a very
      // capricious API key at that. I tried to use env variable with string
      // concatenation and template literals but that messses up the auth for
      // some reason
      headers: {
        'Authorization': 'Bearer NGiVIAjMMLcVkvohdgmCFPCQXUtqn1UZ'
      },
      body: JSON.stringify({
        'email': searchQuery,
      })
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      this.setState({
        searchResult: response,
        hasSearched: true
      })
    })
    .catch((err) => {
      alert(`Something went wrong!
        ${err}`)
      console.log(err)
    })
  }

  clearSearch() {
    this.setState({
      searchQuery: null,
      hasSearched: false
    })
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <Link to="/people-finder" className="nav-button">People Finder</Link>
            <a href="https://github.com/fanelenan7/people-finder" className="nav-button">github</a>
          </nav>
          <main>
            <Route
              path="/people-finder"
              render={() => {
                if(this.state.hasSearched) {
                  return <Redirect to="/result" />
                }
                return <Search
                  searchQuery={this.state.searchQuery}
                  onFormInput={(e) => this.handleInput(e)}
                  onFormSubmit={(e) => this.handleSubmit(e)}
                />
              }}
            />
            <Route
              path="/result"
              render={() => {
                if (!this.state.searchQuery && !this.state.searchResult) {
                  return <Redirect to="/people-finder" />
                }
                return (
                  <Result
                    searchResult={this.state.searchResult}
                    clearSearch={() => this.clearSearch()}
                  />
                )
              }}
            />
            <Route
              path="/*"
              render={() => {
              return <Redirect to="/people-finder" />
              }}
            />
          </main>
        </div>
      </Router>
    );
  };
};

export default App;
