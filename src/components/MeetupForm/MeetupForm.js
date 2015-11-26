import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { pushState } from 'redux-router';
import * as meetupActions from 'redux/modules/meetups';
import { Spinner } from 'components';

@connect(
  state => ({
    submit: state.modal.submit,
    saving: state.meetups.saving,
    saveSuccess: state.meetups.saveSuccess,
    saveError: state.meetups.saveError
  }), {...meetupActions, pushState})
@reduxForm({
  form: 'meetup',
  fields: ['name', 'date', 'address', 'website', 'notes']
})
export default class MeetupForm extends Component {
  static propTypes = {
    saving: PropTypes.bool.isRequired,
    saveSuccess: PropTypes.object,
    saveError: PropTypes.bool,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    addMeetup: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    submit: PropTypes.string,
    pushState: PropTypes.func
  };

  componentWillReceiveProps(nextProps) {
    if ((!this.props.saveSuccess && nextProps.saveSuccess)
        || (this.props.saveSuccess && this.props.saveSuccess.newId !== nextProps.saveSuccess.newId)) {
      this.props.onClose();
      this.props.pushState(null, `/meetups/${nextProps.saveSuccess.newId}`);
    }
  }

  render() {
    const { fields: {name, date, address, website, notes}, handleSubmit,
      addMeetup, onClose, submit, saving } = this.props;
    const submitFn = submit === 'add' ? addMeetup : null;
    return (
      <form onSubmit={handleSubmit(submitFn)} className="add-form modal-form">
        <div className="row">
          <div className="six columns">
            <label htmlFor="add-meetup-name">Name</label>
            <input
              type="text"
              className="add-form-input"
              id="add-meetup-name"
              autoFocus
              {...name}
            />
          </div>
          <div className="six columns">
            <label htmlFor="add-meetup-date">Date</label>
            <input
              type="text"
              className="add-form-input"
              id="add-meetup-date"
              {...date}
            />
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <label htmlFor="add-meetup-address">Location</label>
            <input
              type="text"
              className="add-form-input"
              id="add-meetup-address"
              {...address}
            />
          </div>
          <div className="six columns">
            <label htmlFor="add-meetup-website">Website</label>
            <input
              type="text"
              className="add-form-input"
              id="add-meetup-website"
              {...website}
            />
          </div>
        </div>
        <label htmlFor="add-meetup-notes">Notes</label>
        <textarea
          className="add-form-input"
          id="add-meetup-notes"
          {...notes}
        />
        <div className="centered">
          <button
            type="submit"
            className="button button-primary" disabled={saving}>
              {saving ? <Spinner text="Saving..."/> : 'Save'}
          </button>
          <button onClick={onClose} className="button button-secondary" disabled={saving}>
            Cancel
          </button>
        </div>
      </form>
    );
  }
}
