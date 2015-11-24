import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { getConnection } from 'redux/modules/connections';
import { Spinner, Image } from 'components';
import { contactAttribs } from 'utils/constants';

import classnames from 'classnames';
import marked from 'marked';

@connect(
  state => ({
    meetups: state.meetups,
    connections: state.connections
  }))
export default class ConnectionDetail extends Component {
  static propTypes = {
    params: PropTypes.object,
    meetups: PropTypes.object,
    connections: PropTypes.object
  };

  _renderContactInfo(contact) {
    return Object.keys(contact).map((contactType) => {
      let inner;
      const value = contact[contactType];
      const { iconClass, name } = contactAttribs[contactType];

      if (value.length) {
        switch (contactType) {
          case 'email':
            inner = <a href={`mailto:${value}`} target="_blank">{value}</a>;
            break;
          case 'facebook':
          case 'linkedin':
            inner = <a href={value} target="_blank">{value}</a>;
            break;
          case 'twitter':
            inner = <a href={`http://www.twitter.com/${value}`} target="_blank">@{value}</a>;
            break;
          default:
            inner = value;
        }

        return <p><i className={'fa fa-fw fa-2x fa-' + iconClass}></i> {name}: {inner}</p>;
      }
    });
  }

  render() {
    const style = require('./ConnectionDetail.scss');
    const { params, meetups, connections } = this.props;

    const connection = getConnection(params.connectionId, connections.data);
    const { name, photo, company, education, contact, impressions, meetupId } = connection;

    const meetup = meetups.data[meetupId];

    return (<div className={style.detailConnection}>

        {!connections.loaded && <Spinner text="Loading connection..."/>}
        {connections.loaded && meetups.loaded &&
          <div className={style.detailConnectionContent}>
            <div className={style.detailInfo}>
              <div className="detailHeader">
                <h3>
                  {photo && <Image src={photo} height="100" width="100" />}
                  {name}
                </h3>
                <a>
                  <i className="fa fa-pencil icon-action"></i> Edit Connection
                </a>
                <i className="fa fa-circle divider"></i>
              </div>
              <div className="detailContent">
                <div className={classnames(style.companyInfo, company.logo.length ? null : style.noLogo)}>
                  {company.logo &&
                    <Image src={company.logo} height="50" width="50" />}
                  <div className={style.companyInfoAttributes}>
                    <p className={classnames(style.companyInfoAttribute, style.position)}>
                      {company.position}
                    </p>
                    <p className={classnames(style.companyInfoAttribute, style.company)}>
                      {company.name}
                    </p>
                    <p className={classnames(style.companyInfoAttribute, style.location)}>
                      <i className="fa fa-map-pin"></i> {company.location}
                    </p>
                  </div>
                </div>
                <div>
                  <i className="fa fa-graduation-cap"></i> {education}
                </div>
                <h5>Contact Information</h5>
                {this._renderContactInfo(contact)}
                <h5>Impressions</h5>
                {impressions ?
                  <div key="impressionsHtml" dangerouslySetInnerHTML={{ __html: marked(impressions, { sanitize: true }) }} /> :
                  <div className="info" key="info">What did you think about {name}? Record your impressions <a>here</a>.</div>}
                <h5>Met at</h5>
                {meetups.loaded &&
                  <span>{meetup.name} <em>{meetup.address}</em></span>
                }
              </div>
            </div>
          </div>
        }
      </div>);
  }
}
