import { fromJS } from 'immutable';

const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';

const initialState = fromJS({
  loading: false,
  loaded: false,
  loggingIn: false,
  user: null
});

export default function reducer(state = initialState, action = {}) {
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
    default:
      return state;
  }
}


export function isLoaded(store) {
  return !!store.getIn(['auth', 'user']);
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('tokens')
  };
}
