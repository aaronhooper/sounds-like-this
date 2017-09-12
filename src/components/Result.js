import React, { Component } from 'react'

class Result extends Component {
  
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <h3 className="result">
        <img src={this.props.img} alt="" />
        <a href={this.props.href}>
          {this.props.name}
        </a>
      </h3>
    )
  }
}

export default Result
