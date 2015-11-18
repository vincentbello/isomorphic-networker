import Firebase from 'firebase';

const MEETUPS_REPLACE = 'MEETUPS_REPLACE';

const initialState = {
  loaded: false,
  data: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case MEETUPS_REPLACE:
      return { data: action.value, loaded: true }; // Replace state entirely
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

      const newMeetups = [];

      snapshot.forEach(meetupObj => {
        const meetup = meetupObj.val();
        meetup.id = meetupObj.key();
        console.log(meetup.id);
        newMeetups.push(meetup);
      });

      dispatch(replaceMeetups(newMeetups));
    });
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

