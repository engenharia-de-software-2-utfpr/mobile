import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Reactotron from '../config/ReactotronConfig';
const INITIAL_STATE = {
  occurrence: {
    latitude: 0,
    longitude: 0,
    description: '',
    category: null,
    criticityLevel: 3,
    photos: [],
    videos: [],
    audios: [],
  },
  uploading: false,
  error: null,
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'UPDATE_POSITION':
      return {
        ...state,
        occurrence: {
          ...state.occurrence,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
      };

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

    case 'ADD_VIDEO_SUCCESS':
      return {
        ...state,
        occurrence: {
          ...state.occurrence,
          videos: [...state.occurrence.videos, action.payload.video],
        },
      };
    case 'ADD_VIDEO_FAILURE':
      return {...state, error: action.payload.error};

    case 'REMOVE_VIDEO':
      const videos = state.occurrence.videos.filter(
        video => video !== action.payload.video,
      );

      return {
        ...state,
        occurrence: {
          ...state.occurrence,
          videos,
        },
        error: null,
      };

    case 'ADD_AUDIO_SUCCESS':
      return {
        ...state,
        occurrence: {
          ...state.occurrence,
          audios: [...state.occurrence.audios, action.payload.audio],
        },
      };
    case 'ADD_AUDIO_FAILURE':
      return {...state, error: action.payload.error};

    case 'REMOVE_AUDIO':
      const audios = state.occurrence.audios.filter(
        audio => audio !== action.payload.audio,
      );

      return {
        ...state,
        occurrence: {
          ...state.occurrence,
          audios,
        },
        error: null,
      };

    case 'CLEAR_OCCURRENCE':
      return {
        ...state,
        occurrence: {
          ...state.occurrence,
          description: '',
          category: null,
          criticityLevel: 3,
          photos: [],
          videos: [],
          audios: [],
        },
        error: null,
      };

    case 'UPDATE_OCCURRENCE':
      return {
        ...state,
        occurrence: {...state.occurrence, ...action.payload.data},
      };

    case 'CREATE_OCCURRENCE_STARTED':
      return {
        ...state,
        uploading: true,
      };

    case 'CREATE_OCCURRENCE_SUCCESS':
      return {
        ...state,
        uploading: false,
      };

    case 'CREATE_OCCURRENCE_FAILED':
      return {
        ...state,
        uploading: false,
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
