import React, { Component } from 'react'

class Result extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <li className="result">
        <img src={this.insertPlaceholder()} alt="" />
        <a href={this.props.href}>
          {this.props.name}
        </a>
      </li>
    )
  }

  insertPlaceholder() {
    if (!this.props.img) return './noimage.png'
    return this.props.img
  }
}

export default Result
