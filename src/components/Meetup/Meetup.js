import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Meetup extends Component {
  static propTypes = {
    meetup: PropTypes.object.isRequired
  }

  render() {
    const { meetup } = this.props;
    const { id, name, address } = meetup;
    const style = require('./Meetup.scss');

    return (
      <div className={style.meetup}>
        <Link to={'/meetups/' + id}
          className={style.meetupLink}>
          <h5 className={style.meetupListName}>{name}</h5>
          <div className={style.meetupListCaption}>{address}</div>
          <i className="fa fa-lg fa-angle-right"></i>
        </Link>
      </div>
    );
  }
}
