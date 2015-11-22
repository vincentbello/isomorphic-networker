import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { contactAttribs } from 'utils/constants';

export default class Connection extends Component {
  static propTypes = {
    connection: PropTypes.object.isRequired
  }

  render() {
    const { id, photo, name, company, contact } = this.props.connection;
    // const styles = require('./Connection.scss');

    return (
      <tr className="connection">
        <td>
          {photo.length > 0 &&
            <img src={photo} height="30" width="30" />
          }
        </td>
        <td>
          <Link to={'/connections/' + id}>
            {name}
          </Link>
        </td>
        <td>
          {company.name}
        </td>
        <td>
          {company.position}
        </td>
        <td>
          {
            Object.keys(contact).map(contactType => {
              return contact[contactType] && contact[contactType].length && (
                <i key={contactType} className={'fa fa-' + contactAttribs[contactType].iconClass} title={contactAttribs[contactType].name}></i>);
            })
          }
        </td>
        <td>
          <a title="Edit Connection">
            <i className="fa fa-pencil"></i>
          </a>
          <a title="Remove Connection">
            <i className="fa fa-times"></i>
          </a>
        </td>
      </tr>
    );

  }
}
