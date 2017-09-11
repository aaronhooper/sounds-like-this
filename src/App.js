import React, { Component } from 'react'
import Search from './components/Search'

import './App.css'

class App extends Component {
  // constructor() {
  //   super()
  // }

  render() {
    return (
      <div className="App container">
        <div className="row">
          <div className="col-md-6 col-centered">
            <h1>sounds like this</h1>
            <Search />
          </div>
        </div>
      </div>
    )
  }
}

export default App
