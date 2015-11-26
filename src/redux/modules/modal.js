const MODAL_OPEN = 'MODAL_OPEN';
const MODAL_CLOSE = 'MODAL_CLOSE';

const initialState = {
  isOpen: false,
  form: null,
  submit: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case MODAL_OPEN:
      return Object.assign({}, state, {
        isOpen: true,
        form: action.value,
        submit: action.submit
      });
    case MODAL_CLOSE:
      return Object.assign({}, state, {
        isOpen: false
      });
    default:
      return state;
  }
}

export function openModal(form = 'meetup', submit = 'add') {
  console.log('opening modal of type');
  return {
    type: MODAL_OPEN,
    value: form,
    submit: submit
  };
}

export function closeModal() {
  console.log('closing modal');
  return {
    type: MODAL_CLOSE
  };
}
