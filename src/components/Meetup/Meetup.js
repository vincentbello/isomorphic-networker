import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Meetup extends Component {
  static propTypes = {
    meetup: PropTypes.object.isRequired,
    selectMeetup: PropTypes.func.isRequired
  }

  render() {
    const { meetup } = this.props;
    const styles = require('./Meetup.scss');

    return (
      <div className={styles.meetup}>
        <Link to={'/meetups/' + meetup.id}
          className={styles.meetupLink}>
          <h5 className={styles.meetupListName}>{meetup.name}</h5>
          <div className={styles.meetupListCaption}>{meetup.address}</div>
          <i className="fa fa-lg fa-angle-right"></i>
        </Link>
      </div>
    );
  }
}
