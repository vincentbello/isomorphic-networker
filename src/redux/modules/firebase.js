const FIREBASE_URL_SET = 'FIREBASE_URL_SET';

const initialState = null;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FIREBASE_URL_SET:
      return action.value;
    default:
      return state;
  }
}

export function setFirebaseUrl(url) {
  return {
    type: FIREBASE_URL_SET,
    value: url
  };
}
