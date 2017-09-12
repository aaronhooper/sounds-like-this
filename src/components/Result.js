import React, { Component } from 'react'

class Result extends Component {

  constructor(props) {
    super(props)
  }

  insertPlaceholder() {
    if (!this.props.img) return './noimage.png'
    return this.props.img
  }

  render() {
    return (
      <h3 className="result">
        <img src={this.insertPlaceholder()} alt="" />
        <a href={this.props.href}>
          {this.props.name}
        </a>
      </h3>
    )
  }
}

export default Result
