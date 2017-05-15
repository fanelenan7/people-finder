import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Search.css'

class Search extends Component {
  render() {
    return(
      <div>
        <form onSubmit={(e) => this.props.onFormSubmit(e)}>
          <h1>Search People by Email</h1>
          <input
            className="search"
            placeholder="bill@microsoft.com"
            onChange={(e) => this.props.onFormInput(e)}
          />
          <br />
          <button type="submit" className="submit-button">Search</button>
        </form>
      </div>
    )
  }
}

export default Search
