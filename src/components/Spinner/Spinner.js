import React, { Component, PropTypes } from 'react';

export default class Spinner extends Component {
  static propTypes = {
    text: PropTypes.string
  }

  render() {
    const { text } = this.props;
    return (
      <div className="spinner">
        <i className="fa fa-cog fa-spin fa-lg"></i>
        {text || 'Loading Meetups...'}
      </div>
    );
  }
}
