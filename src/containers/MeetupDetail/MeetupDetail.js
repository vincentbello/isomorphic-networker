import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(
  state => ({user: state.meetups})
)
export default
class MeetupDetail extends Component {
  static propTypes = {
    params: PropTypes.object
  };

  render() {
    // const style = require('./MeetupDetail.scss');
    const { meetupId } = this.props.params;

    return (
      <div>
        <h1>Meetup with ID: {meetupId}</h1>
      </div>
    );
  }
}
