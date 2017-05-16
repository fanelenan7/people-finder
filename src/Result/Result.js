import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Result.css'

class Result extends Component {
  componentDidMount() {
    this.props.clearSearch()
  }

  render() {
    let result = this.props.searchResult
    let mappedProfiles = result.socialProfiles.map((profile, index) => {
      let url = profile.url
      let socialMedia = profile.typeName
      return (
        <li key={index}><span>{socialMedia}</span>: <Link to={{
            pathname: url
          }} className="social-media">{url}</Link></li>
      )
    })
    return(
      <div>
      <div className="results-container">
        <h1 className="results-header">Search Results</h1>
        <img src={result.photos[0].url}/>
        <div><span>Full Name:</span> {result.contactInfo.fullName}</div>
        <div><span>Location:</span> {result.demographics.locationGeneral}</div>
        <div><span>Social Profiles:</span><br />
        {mappedProfiles}</div>
      <Link to="/people-finder" className="search-again">Search Again</Link>
      </div>
      </div>
    )
  }
}

export default Result
