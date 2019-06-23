import React, { Component } from 'react';

export default class Loader extends Component {
  static defaultProps = {
    color: '#000000'
  };

  render() {
    const { color } = this.props;

    return (
      <div className="loading">
        <div className="dot" style={{ backgroundColor: color }} />
        <div className="dot" style={{ backgroundColor: color }} />
        <div className="dot" style={{ backgroundColor: color }} />
      </div>
    );
  }
}
