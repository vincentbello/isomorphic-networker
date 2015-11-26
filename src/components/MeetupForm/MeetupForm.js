import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as meetupActions from 'redux/modules/meetups';
import { Spinner } from 'components';

@connect(
  state => ({
    submit: state.modal.submit,
    saving: state.meetups.saving,
    saveError: state.meetups.saveError
  }), meetupActions)
@reduxForm({
  form: 'meetup',
  fields: ['name', 'date', 'address', 'website', 'notes']
})
export default class MeetupForm extends Component {
  static propTypes = {
    saving: PropTypes.bool.isRequired,
    saveError: PropTypes.bool,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    addMeetup: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    submit: PropTypes.string
  };

  render() {
    const { fields: {name, date, address, website, notes},
      handleSubmit, addMeetup, onClose, submit, saving } = this.props;
    const submitFn = submit === 'add' ? addMeetup : null;
    return (
      <form onSubmit={handleSubmit(submitFn)} className="add-form modal-form">
        <input type="text" className="add-form-input" {...name}/>
        <input type="text" className="add-form-input" {...date}/>
        <input type="text" className="add-form-input" {...address}/>
        <input type="text" className="add-form-input" {...website}/>
        <input type="text" className="add-form-input" {...notes}/>

        <button type="submit" className="button button-primary" disabled={saving}>
          {saving ? <Spinner text="Saving..."/> : 'Save'}
        </button>
        <button onClick={onClose} className="button button-secondary" disabled={saving}>
          Cancel
        </button>

      </form>
    );
  }
}
