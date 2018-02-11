import { fromJS } from 'immutable';

export const STATE_KEY = 'users';

export const CLEAR = `${STATE_KEY}/CLEAR`;

export const LOAD = `${STATE_KEY}/LOAD`;
export const LOAD_SUCCESS = `${STATE_KEY}/LOAD_SUCCESS`;
export const LOAD_FAIL = `${STATE_KEY}/LOAD_FAIL`;

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
    case CLEAR:
      return initialImmutableState;
    case LOAD:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', true);
      });
    case LOAD_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState
          .set('loading', false)
          .set('loaded', true)
          .set('records', result.get('records'));
      });
    case LOAD_FAIL:
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

/*
* Getters
*/

export const getUsers = (state) => state.get(STATE_KEY);
export const getUsersRecords = (state) => getUsers(state).get('records');
export const getUsersLoading = (state) => getUsers(state).get('loading');
export const getUsersLoaded = (state) => getUsers(state).get('loaded');
export const getUsersError = (state) => getUsers(state).get('error');

/*
* Actions
*/

export function clearUsers() {
  return {
    type: CLEAR,
  };
}

export function loadUsers() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get(`/api/${STATE_KEY}`),
  };
}
