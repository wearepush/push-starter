import { fromJS } from 'immutable';

export const STATE_KEY = 'login';

export const CLEAR_LOGIN = `${STATE_KEY}/CLEAR`;

const LOAD_LOGIN = `${STATE_KEY}/LOAD`;
const LOAD_LOGIN_SUCCESS = `${STATE_KEY}/LOAD_SUCCESS`;
const LOAD_LOGIN_FAIL = `${STATE_KEY}/LOAD_FAIL`;

const initialState = {
  error: null,
  loading: false,
  loaded: false,
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  const { error } = action;
  switch (action.type) {
    case CLEAR_LOGIN:
      return initialImmutableState;

    case LOAD_LOGIN:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', true);
      });
    case LOAD_LOGIN_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState
          .set('loading', false)
          .set('loaded', true)
          .set('error', null);
      });
    case LOAD_LOGIN_FAIL:
      return state.withMutations((mutableState) => {
        mutableState
          .set('loading', false)
          .set('loaded', false)
          .set('error', error);
      });

    default:
      return state;
  }
}

export function clear(branch) {
  return {
    branch,
    type: CLEAR_LOGIN,
  };
}

export function load() {
  return {
    types: [LOAD_LOGIN, LOAD_LOGIN_SUCCESS, LOAD_LOGIN_FAIL],
    promise: client => client.get(`/api/${STATE_KEY}`)
  };
}
