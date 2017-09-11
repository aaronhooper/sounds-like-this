import React, { Component } from 'react'
import Result from './Result'
import axios from 'axios'
import url from 'url'

class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchTerm: ""
    }
    this.getData = this.getData.bind(this)
    this.updateSearchTerm = this.updateSearchTerm.bind(this)
  }

  getData(e) {
    e.preventDefault()
    const apiHref = 'http://ws.audioscrobbler.com/2.0/'
    let apiURLObject = url.parse(apiHref)

    apiURLObject.query = {
      method: 'artist.getsimilar',
      api_key: '9a9863a1638f78d7be214bb63d0c0ea0',
      format: 'json',
      limit: '8',
      artist: this.state.searchTerm
    }

    axios.get(url.format(apiURLObject))
         .then(res => {
           this.setState({ response: res })
         })
         .catch(err => { console.log(err) })
  }

  renderResults() {
    if (!this.state.response) return

    if (this.state.response.data.error === 6) {
      console.log('None found!')
      return
    }

    let results = []
    let artists = this.state.response.data.similarartists.artist

    for (let i = 0; i < artists.length; i++) {
      results.push(
        <Result img={artists[i].image[1]['#text']}
                href={artists[i].url}
                name={artists[i].name}
        />
      )
    }

    return results
  }

  updateSearchTerm(e) {
    this.setState({ searchTerm: e.target.value })
  }

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.getData}>
          <div className="input-group">
            <input className="form-control" id="search" type="search"
                   value={this.state.searchTerm}
                   onChange={this.updateSearchTerm}>
            </input>
            <span className="input-group-btn">
              <button className="btn btn-primary" id="submit" type="submit">Go!</button>
            </span>
          </div>
        </form>
        <div>
          {this.renderResults()}
        </div>
      </div>
    )
  }
}

export default Search
