import React, { Component } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom'

import Search from '../Search/Search'
import Results from '../Results/Results'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      searchQuery: null,
      searchResult: null,
      hasSearched: false
    }
  }

  handleInput(e) {
    this.setState({
      searchQuery: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.defaults.headers.common['X-FullContact-APIKey'] = "2a5de7a16697e442"
    axios.get(`https://api.fullcontact.com/v2/person.json?email=${this.state.searchQuery}`)
      .then((response) => {
        this.setState({
          searchResult: response,
          hasSearched: true
        })
      }).catch((err) => {
        alert(err)
        console.log(err)
      })
  }

  printResult() {
    return (
      <Results
        searchResult={this.state.searchResult}
        clearSearch={() => this.clearSearch()}
      />
    )
  }

  clearSearch() {
    this.setState({
      hasSearched: false
    })
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <Link to="/people-finder">People Finder</Link>
            <a href="https://github.com/fanelenan7/people-finder">github</a>
          </nav>
          <main>
            <Route
              path="/people-finder"
              render={() => {
                if(this.state.hasSearched) {
                  return <Redirect to="/results" />
                }
                return <Search
                  searchQuery={this.state.searchQuery}
                  onFormInput={(e) => this.handleInput(e)}
                  onFormSubmit={(e) => this.handleSubmit(e)}
                />
              }}
            />
            <Route
              path="results"
              render={() => this.printResult()}
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
  }
}

export default App
