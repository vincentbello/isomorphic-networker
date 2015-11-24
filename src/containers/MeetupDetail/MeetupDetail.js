import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { setMeetupFilter, filterConnections } from 'redux/modules/connections';
import { Connection, Spinner } from 'components';

import moment from 'moment';
import marked from 'marked';

@connect(
  state => ({
    meetups: state.meetups,
    filteredConnections: filterConnections(state.connections.data, state.connections.meetupFilter)
  }),
  dispatch => bindActionCreators({ setMeetupFilter }, dispatch))
export default class MeetupDetail extends Component {
  static propTypes = {
    params: PropTypes.object,
    setMeetupFilter: PropTypes.func,
    meetups: PropTypes.object,
    filteredConnections: PropTypes.array
  };

  componentWillMount() {
    this.props.setMeetupFilter(this.props.params.meetupId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.meetupId !== this.props.params.meetupId) {
      this.props.setMeetupFilter(nextProps.params.meetupId);
    }
  }

  render() {
    const style = require('./MeetupDetail.scss');
    const { meetups, params, filteredConnections } = this.props;
    const meetup = meetups.data[params.meetupId];

    return meetups.loaded ? (
      <div className={style.detailMeetup}>
        <div className="detailHeader">
          <h3>{meetup.name}</h3>
          <a>
            <i className="fa fa-pencil icon-action"></i> Edit Meetup
          </a>
          <i className="fa fa-circle divider"></i>
        </div>
        <div className="detailContent">
          <div className={style.detailMeetupEventDetails}>
            <p>
              <i className="fa fa-calendar-check-o"></i> {moment(meetup.date).format('MMMM D, YYYY')}
              <i className="fa fa-map-pin"></i> {meetup.address}
              <i className="fa fa-external-link"></i> <a target="_blank" href={meetup.website}>Event Website</a>
            </p>
          </div>
          <div className="detail-meetup-desc">
            <h5>Notes</h5>
            <div dangerouslySetInnerHTML={{ __html: marked(meetup.notes, { sanitize: true }) }} />
          </div>
          <div className="meetup-connections">
            <div className={style.connectionsList}>
              <h4>Connections</h4>
              <a>
                <i className="fa fa-plus-circle"></i> Add Connection
              </a>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Position</th>
                    <th>Contact</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>

                  {filteredConnections.map(connection => (
                    <Connection connection={connection} key={connection.id} />
                    )
                  )}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className={style.detailMeetup}>
        <Spinner text="Loading meetup..."/>
      </div>
    );
  }
}
