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

export default function reducer(state = initialState, action = {}) {
  const { error, result } = action;
  switch (action.type) {
    case CLEAR:
      return initialState;
    case LOAD:
      return {
        ...state,
        loading: true,
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        records: result.records,
      };
    case LOAD_FAIL:
      return {
        ...state,
        error,
        loading: false,
        loaded: false,
      };
    default:
      return state;
  }
}

/*
* Getters
*/

export const getUsers = (state) => state[STATE_KEY];
export const getUsersRecords = (state) => getUsers(state).records;
export const getUsersLoading = (state) => getUsers(state).loading;
export const getUsersLoaded = (state) => getUsers(state).loaded;
export const getUsersError = (state) => getUsers(state).error;

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
