import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Reactotron from '../config/ReactotronConfig';
const INITIAL_STATE = {
  occurrence: {
    photos: [],
  },
  error: null,
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_PHOTO_SUCCESS':
      return {
        ...state,
        occurrence: {
          ...state.occurrence,
          photos: [...state.occurrence.photos, action.payload.photo],
        },
      };
    case 'ADD_PHOTO_FAILURE':
      return {...state, error: action.payload.error};

    case 'REMOVE_PHOTO':
      const photos = state.occurrence.photos.filter(
        photo => photo !== action.payload.photo,
      );

      return {
        ...state,
        occurrence: {
          ...state.occurrence,
          photos,
        },
        error: null,
      };

    default:
      return state;
  }
}

const middlewares = [];

if (__DEV__) {
  const reactotronMiddleware = Reactotron.createEnhancer();
  middlewares.push(reactotronMiddleware);
}

middlewares.push(applyMiddleware(thunk));

const store = createStore(reducer, compose(...middlewares));

export default store;
