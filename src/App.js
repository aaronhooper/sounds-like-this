import React, { Component } from 'react'
import Search from './components/Search'
import Result from './components/Result'
import axios from 'axios'
import url from 'url'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      response: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateSearchTerm = this.updateSearchTerm.bind(this)
  }

  handleSubmit(e) {
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
           console.log(url.format(apiURLObject))
           this.setState({ response: res })
         })
         .catch(err => { console.log(err) })
  }

  changeTitle() {
    document.title = `sounds like ${this.state.searchTerm || 'this'}`
  }

  updateSearchTerm(e) {
    this.setState({ searchTerm: e.target.value }, () => { this.changeTitle() })
  }

  renderResults() {
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
        />
      )
    }
    return results
  }

  render() {
    return (
      <div className="App container">
        <div className="row">
          <div className="col-sm-6 col-centered">
            <h1>{`sounds like ${this.state.searchTerm || 'this'}`}</h1>
            <Search onSubmit={this.handleSubmit} onChange={this.updateSearchTerm} />
            <ul>
              {this.renderResults()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default App
