import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
// import { bindActionCreators } from 'redux';
import { selectMeetup } from 'redux/modules/meetups';

@connect(
  state => ({meetups: state.meetups}),
  selectMeetup
)
export default class MeetupDetail extends Component {
  static propTypes = {
    params: PropTypes.object,
    meetups: PropTypes.object,
    selectMeetup: PropTypes.func
  };

  componentDidMount() {
    this.props.selectMeetup(this.props.params.meetupId);
  }

  render() {
    // const style = require('./MeetupDetail.scss');
    const { meetups, params } = this.props;
    const meetup = meetups.data[params.meetupId];

    return (
      <div>
        <h1>{meetup.name}</h1>
        <h3 className="subheadline">{meetup.address}</h3>
      </div>
    );
  }
}
