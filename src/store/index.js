import {createStore} from 'redux';

const INITIAL_STATE = {
  occurrence: {
    photos: [
      'file:///storage/emulated/0/RioDoCampoLimpo/a4d853e3-af2b-4ec5-9cd5-f3b73d750e03.jpg',
    ],
  },
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'NEW_OCCURRENCE':
      return {...state};
    case 'ADD_PHOTO':
      return {
        ...state,
        occurrence: {
          ...state.occurrence,
          photos: [...state.occurrence.photos, 'a'],
        },
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
