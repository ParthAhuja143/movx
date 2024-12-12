import {
  FETCH_DISCOVER_MOVIES_SUCCESS,
  FETCH_MAIN_MOVIES_SUCCESS, FETCH_POPULAR_MOVIES_SUCCESS, FETCH_SELECTED_MOVIE_SUCCESS,
  FETCH_TOPRATED_MOVIES_SUCCESS, FETCH_TRENDING_MOVIES_SUCCESS,
  FETCH_TV_SHOWS_SUCCESS,
  FETCH_UPCOMING_MOVIES_SUCCESS
} from '@app/constants/actionType';
import { IMovieState } from '@app/types/types';
import { TMovieActionType } from '../actions/movieActions';

const defaultState: IMovieState = {
  trending: null,
  discover: null,
  current: {
    movie: null,
    keywords: [],
    casts: [],
    reviews: [],
  },
  popular: null,
  topRated: null,
  upcoming: null,
  tvShows: null,
}

const moviesReducer = (state = defaultState, action: TMovieActionType) => {
  switch (action.type) {
    case FETCH_TRENDING_MOVIES_SUCCESS:
      return {
        ...state,
        trending: { ...action.payload, results: [...(state.trending?.results || []), ...(action.payload.results || [])]},
      };
    case FETCH_DISCOVER_MOVIES_SUCCESS:
      return {
        ...state,
        discover: { ...action.payload, results: [...(state.discover?.results || []), ...(action.payload.results || [])]},
      };
    case FETCH_TV_SHOWS_SUCCESS:
      return {
        ...state,
        tvShows: { ...action.payload, results: [...(state.tvShows?.results || []), ...(action.payload.results || [])]},
      };
    case FETCH_SELECTED_MOVIE_SUCCESS:
      return {
        ...state,
        current: action.payload,
      };
    case FETCH_POPULAR_MOVIES_SUCCESS:
      return {
        ...state,
        popular: {...action.payload, results: [...(state.popular?.results || []), ...(action.payload.results || [])]},
      };
    case FETCH_TOPRATED_MOVIES_SUCCESS:
      return {
        ...state,
        topRated: {...action.payload, results: [...(state.topRated?.results || []), ...(action.payload.results || [])]},
      };
    case FETCH_UPCOMING_MOVIES_SUCCESS:
      return {
        ...state,
        upcoming: {
          ...action.payload,
          results: [
            ...(state.upcoming?.results || []),
            ...(action.payload.results || [])
          ]
        },
      };
    case FETCH_MAIN_MOVIES_SUCCESS:
      return {
        ...state,
        upcoming: action.payload.upcoming,
        topRated: action.payload.topRated,
        popular: action.payload.popular,
      };
    default:
      return state;
  }
};

export default moviesReducer;
