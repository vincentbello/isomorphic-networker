import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

export default class Meetup extends Component {
  static propTypes = {
    meetup: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired
  }

  render() {
    const { meetup, onSelect, isSelected } = this.props;
    const { id, name, address } = meetup;
    const style = require('./Meetup.scss');

    return (
      <div className={classnames(style.meetup, isSelected ? style.selected : null)}>
        <Link to={'/meetups/' + id}
          className={style.meetupLink}
          onClick={() => { console.log(onSelect); onSelect(id);}}>
          <h5 className={style.meetupListName}>{name}</h5>
          <div className={style.meetupListCaption}>{address}</div>
          <i className="fa fa-lg fa-angle-right"></i>
        </Link>
      </div>
    );
  }
}
