export const STATE_KEY = 'login';

export const CLEAR = `${STATE_KEY}/CLEAR`;

export const LOAD = `${STATE_KEY}/LOAD`;
export const LOAD_SUCCESS = `${STATE_KEY}/LOAD_SUCCESS`;
export const LOAD_FAIL = `${STATE_KEY}/LOAD_FAIL`;

export const initialState = {
  error: null,
  loading: false,
  loaded: false,
};

export default function reducer(state = initialState, action = {}) {
  const { error } = action;
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

export function clear(branch) {
  return {
    branch,
    type: CLEAR,
  };
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get(`/api/${STATE_KEY}`)
  };
}
