import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery'
import jsonp from 'jsonp'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom'

import Search from '../Search/Search'
import Result from '../Result/Result'
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
    let searchQuery = this.state.searchQuery
    let url = `https://api.fullcontact.com/v2/person.json?email=${searchQuery}`
    axios.defaults.headers.common['X-FullContact-APIKey'] = '2a5de7a16697e442'
    axios.get(url)
      .then((response) => {
        this.setState({
          searchResult: response.data,
          hasSearched: true
        })
      }).catch((err) => {
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
  }
}

export default App
