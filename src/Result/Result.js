import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Result.css';

class Result extends Component {
  componentDidMount() {
    this.props.clearSearch();
  }

  render() {
    let result = this.props.searchResult
    return(
      <div>
      <div className="results-container">
        <h1 className="results-header">Search Results</h1>
        <img src={result.avatar}/>
        <div><span>Full Name:</span> {result.fullName}</div>
        <div><span>Location:</span> {(result.location ? `${result.location}`: 'Unknown')}</div>
        <div className="results-social">
          {(result.facebook ? <div><span>Facebook:</span> <a href={result.facebook}>{result.facebook}</a></div> : null )}
          {(result.linkedin ? <div><span>LinkedIn:</span> <a href={result.linkedin}>{result.linkedin}</a></div> : null )}
          {(result.twitter ? <div><span>Twitter:</span> <a href={result.twitter}>{result.twitter}</a></div> : null )}
        </div>
      <Link to="/people-finder" className="search-again">Search Again</Link>
      </div>
      </div>
    )
  }
}

export default Result
