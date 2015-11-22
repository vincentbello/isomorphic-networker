import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { setMeetupFilter, filterConnections } from 'redux/modules/connections';
import { Connection, Spinner } from 'components';

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
    // const style = require('./MeetupDetail.scss');
    const { meetups, params, filteredConnections } = this.props;
    const meetup = meetups.data[params.meetupId];

    return meetups.loaded ? (
      <div>
        <h1>{meetup.name}</h1>
        <h3 className="subheadline">{meetup.address}</h3>
        <h4>Connections</h4>
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
    ) : (
      <Spinner text="Loading meetup..."/>
    );
  }
}
