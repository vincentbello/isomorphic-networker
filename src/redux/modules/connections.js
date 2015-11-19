import Firebase from 'firebase';

const CONNECTIONS_REPLACE = 'CONNECTIONS_REPLACE';
const SET_MEETUP_FILTER = 'SET_MEETUP_FILTER';
// const CONNECTION_SELECT = 'MEETUPS_SELECT';

const initialState = {
  loaded: false,
  data: [],
  meetupFilter: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CONNECTIONS_REPLACE:
      return Object.assign({}, state, {
        data: action.value,
        loaded: true
      }); // Replace state entirely
    case SET_MEETUP_FILTER:
      console.log('setting meetup filter', action);
      return Object.assign({}, state, {
        meetupFilter: action.meetupId
      });
    // case MEETUPS_SELECT:
    //   return Object.assign({}, state, {
    //     selected: action.value
    //   });
    default:
      return state;
  }
}

/**
 * Called every time the firebase ref changes
 */
export function replaceConnections(connections) {
  console.log('replacing connections');
  return {
    type: CONNECTIONS_REPLACE,
    value: connections
  };
}

/**
 * Start listening to changes when the app boots
 */
export function listenToConnectionChanges() {
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = new Firebase(firebase);

    ref.child('connections').on('value', (snapshot) => {

      const newConnections = [];

      snapshot.forEach(connectionObj => {
        const connection = connectionObj.val();
        connection.id = connectionObj.key();
        newConnections.push(connection);
      });

      dispatch(replaceConnections(newConnections));
    });
  };
}

export function setMeetupFilter(meetupId) {
  return {
    type: SET_MEETUP_FILTER,
    meetupId
  };
}

export function filterConnections(connections, filter) {
  return connections.filter(connection => connection.meetupId === filter);
}

export function saveConnection(connection) {
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = new Firebase(firebase);

    ref.child('connections').set(connection);
  };
}

export function isLoaded(globalState) {
  return globalState.connections && globalState.connections.loaded;
}

