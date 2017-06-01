const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';


const initialState = {
  loading: false,
  loaded: false,
  loggingIn: false,
  user: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return { ...state, loading: true };
    case LOAD_SUCCESS:
      return { ...state, loading: false, loaded: true, user: action.result, error: null };
    case LOAD_FAIL:
      return { ...state, loading: false, loaded: false, error: action.error };
    default:
      return state;
  }
}


export function isLoaded(store) {
  return !!store.auth && !!store.auth.user;
}

export function load() {
  return dispatch =>
    dispatch({
      types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
      promise: client => client.get('tokens')
    });
}
