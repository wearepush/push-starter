import { fromJS } from 'immutable';

export const STATE_KEY = 'login';

export const CLEAR = `${STATE_KEY}/CLEAR`;

export const LOAD = `${STATE_KEY}/LOAD`;
export const LOAD_SUCCESS = `${STATE_KEY}/LOAD_SUCCESS`;
export const LOAD_FAIL = `${STATE_KEY}/LOAD_FAIL`;

const initialState = {
  error: null,
  loading: false,
  loaded: false,
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  const { error } = action;
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
          .set('error', null);
      });
    case LOAD_FAIL:
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
    type: CLEAR,
  };
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get(`/api/${STATE_KEY}`)
  };
}
