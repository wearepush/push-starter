import { fromJS } from 'immutable';

export const STATE_KEY = 'users';

export const CLEAR_USERS = `${STATE_KEY}/CLEAR`;

export const LOAD_USERS = `${STATE_KEY}/LOAD`;
export const LOAD_USERS_SUCCESS = `${STATE_KEY}/LOAD_SUCCESS`;
export const LOAD_USERS_FAIL = `${STATE_KEY}/LOAD_FAIL`;

export const initialState = {
  error: null,
  loading: false,
  loaded: false,
  records: []
};

export const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  const { error, result } = action;
  switch (action.type) {
    case CLEAR_USERS:
      return initialImmutableState;

    case LOAD_USERS:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', true);
      });
    case LOAD_USERS_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState
          .set('loading', false)
          .set('loaded', true)
          .set('records', result.get('records'));
      });
    case LOAD_USERS_FAIL:
      return state.withMutations((mutableState) => {
        mutableState
          .set('error', error)
          .set('loading', false)
          .set('loaded', false);
      });

    default:
      return state;
  }
}

export function clear() {
  return {
    type: CLEAR_USERS,
  };
}

export function load() {
  return {
    types: [LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_USERS_FAIL],
    promise: client => client.get(`/api/${STATE_KEY}`),
  };
}
