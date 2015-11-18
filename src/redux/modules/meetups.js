import Firebase from 'firebase';

const MEETUPS_REPLACE = 'MEETUPS_REPLACE';
const MEETUPS_SELECT = 'MEETUPS_SELECT';

const initialState = {
  loaded: false,
  data: {},
  selected: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case MEETUPS_REPLACE:
      return Object.assign({}, state, {
        data: action.value,
        loaded: true
      }); // Replace state entirely
    case MEETUPS_SELECT:
      return Object.assign({}, state, {
        selected: action.value
      });
    default:
      return state;
  }
}

/**
 * Called every time the firebase ref changes
 */
export function replaceMeetups(meetups) {
  console.log('replacing meetups of length', meetups.length);
  return {
    type: MEETUPS_REPLACE,
    value: meetups
  };
}

/**
 * Start listening to changes when the app boots
 */
export function listenToMeetupChanges() {
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = new Firebase(firebase);

    ref.child('events').on('value', (snapshot) => {

      const newMeetups = {};

      snapshot.forEach(meetupObj => {
        const meetup = meetupObj.val();
        meetup.id = meetupObj.key();
        newMeetups[meetup.id] = meetup;
      });

      dispatch(replaceMeetups(newMeetups));
    });
  };
}

/**
 * Select a specific meetup
 */
export function selectMeetup(meetupId) {
  console.log(`selecting meetup ${meetupId}`);
  return {
    type: MEETUPS_SELECT,
    value: meetupId
  };
}

export function saveMeetups(meetups) {
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = new Firebase(firebase);

    ref.child('events').set(meetups);
  };
}

export function isLoaded(globalState) {
  return globalState.meetups && globalState.meetups.loaded;
}

