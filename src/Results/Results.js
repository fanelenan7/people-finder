import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Results.css'

class Results extends Component {
  componentDidMount() {
    this.props.clearSearch()
  }

  render() {
    let result = this.props.searchResult
    return(
      <div className="results-container">
        <img src="{result.photos[0].url}"/>
        <div><span>Full Name:</span> {result.contactInfo.fullName}</div>
        <div><span>Location:</span> {result.demographics.locationGeneral}</div>
        <div><span>Social Profiles</span><br />
        {result.socialProfiles.url}</div>
      <Link className="search-again">Search Again</Link>
      </div>
    )
  }
}

export default Results
