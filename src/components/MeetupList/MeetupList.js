import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { listenToMeetupChanges } from 'redux/modules/meetups';
// import connectData from 'helpers/connectData';
import { Spinner, Meetup } from 'components';

// function fetchDataDeferred(getState, dispatch) {
//   if (!isLoaded(getState())) {
//     return dispatch(listenToMeetupChanges());
//   }
// }

// @connectData(null, fetchDataDeferred)
@connect(
  state => ({
    meetups: state.meetups
  }),
  dispatch => bindActionCreators({listenToMeetupChanges}, dispatch))
export default class MeetupList extends Component {
  static propTypes = {
    meetups: PropTypes.object,
    listenToMeetupChanges: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.listenToMeetupChanges();
  }

  render() {

    const { meetups } = this.props;
    const styles = require('./MeetupList.scss');

    return (
      <div className={styles.meetupList}>
        <h4 className={styles.meetupListHeader}>
          <a>
            <i className="fa fa-plus-circle" title="Add a Meetup"></i>
          </a>
          <span className={styles.meetupListTitle}>
            <i className="fa fa-calendar"></i> Meetups
          </span>
          <span className={styles.dropdownWrapper}>
            <a>
              <i className="fa fa-caret-down"></i>
            </a>
          </span>
        </h4>
        <div className={styles.meetupListContent}>
          {!meetups.loaded &&
            <Spinner />
          }
          {meetups.loaded && !meetups.data.length &&
            <h4>You have not added any meetups yet.</h4>
          }
          {meetups.loaded && meetups.data.length &&
            meetups.data.map((meetup) =>
              <Meetup meetup={meetup} key={meetup.id} />
            )
          }
        </div>

      </div>
    );
  }
}
