export const STATE_KEY = 'users';

// Action types
export const ACTIONS_TYPES = {
  CLEAR: `${STATE_KEY}/CLEAR`,
  LOAD: `${STATE_KEY}/LOAD`,
  LOAD_SUCCESS: `${STATE_KEY}/LOAD_SUCCESS`,
  LOAD_FAIL: `${STATE_KEY}/LOAD_FAIL`,
};

export const initialState = {
  error: null,
  loading: false,
  loaded: false,
  records: [],
};

// Reducer
export default function reducer(state = initialState, action) {
  const { error, result, type } = action;
  switch (type) {
    case ACTIONS_TYPES.CLEAR:
      return initialState;
    case ACTIONS_TYPES.LOAD:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS_TYPES.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        records: result.records,
      };
    case ACTIONS_TYPES.LOAD_FAIL:
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

export function clearUsers() {
  return {
    type: ACTIONS_TYPES.CLEAR,
  };
}

export function loadUsers() {
  return {
    types: [ACTIONS_TYPES.LOAD, ACTIONS_TYPES.LOAD_SUCCESS, ACTIONS_TYPES.LOAD_FAIL],
    promise: (client) => client.get(`/api/${STATE_KEY}`),
  };
}
