// @flow
import { fromJS } from 'immutable';

const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';

const LOGIN = 'auth/LOGIN';
// const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
// const LOGIN_FAIL = 'auth/LOGIN_FAIL';

type State = {
  error: any,
  loading: boolean,
  loaded: boolean,
  user: any
};

const initialState: State = {
  loading: false,
  loaded: false,
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {

    case LOAD:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', true);
      });
    case LOAD_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', false);
        mutableState.set('loaded', true);
        mutableState.set('user', fromJS(action.result));
        mutableState.set('error', null);
      });
    case LOAD_FAIL:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', false);
        mutableState.set('loaded', false);
        mutableState.set('error', fromJS(action.error));
      });

    case LOGIN:
      return state.withMutations((mutableState) => {
        mutableState.set('loggingIn', true);
        mutableState.set('user', action.name);
      });
    // case LOGIN_SUCCESS:
    //   return state.withMutations((mutableState) => {
    //     mutableState.set('loggingIn', false);
    //     mutableState.set('user', action.result);
    //   });
    // case LOGIN_FAIL:
    //   return state.withMutations((mutableState) => {
    //     mutableState.set('loggingIn', false);
    //     mutableState.set('user', null);
    //     mutableState.set('loginError', action.error);
    //   });
    default:
      return state;
  }
}

export function login(name) {
  return {
    types: LOGIN,
    name
  };
}

export function isLoaded(store) {
  return !!store.getIn(['auth', 'user']);
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('/load')
  };
}
