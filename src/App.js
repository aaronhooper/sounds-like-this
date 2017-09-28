import React, { Component } from 'react'
import Search from './components/Search'
import Result from './components/Result'
import './App.css'

import axios from 'axios'
import url from 'url'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { searchTerm: '' }

    // API init
    const apiHref = 'http://ws.audioscrobbler.com/2.0/'
    this.apiURLObject = url.parse(apiHref)
    this.apiURLObject.query = {
      method: 'artist.getsimilar',
      api_key: '9a9863a1638f78d7be214bb63d0c0ea0',
      format: 'json',
      limit: '8'
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateSearchTerm = this.updateSearchTerm.bind(this)
    this.handleNameClick = this.handleNameClick.bind(this)
  }

  render() {
    return (
      <div className="App container">
        <div className="row">
          <div className="col-sm-6 col-centered">

            <h1>{this.title}</h1>
            <Search onSubmit={this.handleSubmit}
                    onChange={this.updateSearchTerm}
                    value={this.state.searchTerm} />
            <ul>
              {this.renderResults()}

            </ul>
          </div>
        </div>
      </div>
    )
  }

  renderResults() {

    // TODO: Change this piece of shit
    try {
      if (this.state.response.data.error === 6) {
        console.log('None found!')
        return
      }
    } catch (e) {
      console.log('api error undefined')
      return
    }

    let results = []
    let artists = this.state.response.data.similarartists.artist

    for (let i = 0; i < artists.length; i++) {
      results.push(
        <Result img={artists[i].image[1]['#text']}
                href={artists[i].url}
                name={artists[i].name}
                onClick={this.handleNameClick}
                key={i}
        />
      )
    }
    return results
  }

  handleSubmit(e) {
    // Don't preventdefault when e hasn't been passed
    // i.e. when not used in render()
    if (e) e.preventDefault()

    this.apiURLObject.query.artist = this.state.searchTerm
    axios.get(url.format(this.apiURLObject))
         .then(res => {
           console.log(url.format(this.apiURLObject))
           this.setState({ response: res })
         })
         .catch(err => { console.log(err) })
  }

  handleNameClick(e) {
    this.setState({ searchTerm: e.target.textContent }, () => {
      document.title = this.title
      this.handleSubmit()
    })
  }

  updateSearchTerm(e) {
    this.setState({ searchTerm: e.target.value },
                  () => { document.title = this.title })
  }

  get title() {
    return `sounds like ${this.state.searchTerm || 'this'}`
  }
}

export default App
