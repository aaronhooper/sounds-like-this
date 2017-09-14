import React, { Component } from 'react'

class Search extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.props.onSubmit}>
          <div className="input-group">
            <input className="form-control" id="search" type="search"
                   onChange={this.props.onChange}
                   placeholder="Name of artist, musician, band..."
                   value={this.props.value}>
            </input>
            <span className="input-group-btn">
              <button className="btn btn-primary" id="submit" type="submit">
                Go!
              </button>
            </span>
          </div>
        </form>
      </div>
    )
  }
}

export default Search
