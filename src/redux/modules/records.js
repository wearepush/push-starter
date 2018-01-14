import { fromJS } from 'immutable';

export const CLEAR = 'CLEAR';

export const LOAD = 'LOAD';
export const LOAD_SUCCESS = 'LOAD_SUCCESS';
export const LOAD_FAIL = 'LOAD_FAIL';

export const initialState = {
  error: null,
  loading: false,
  loaded: false,
  records: [],
};

export const initialImmutableState = fromJS(initialState);

export function createRecordsReducer(
  reducerFunction,
  reducerName
) {
  return (state, action) => {
    const { branch } = action;
    const isInitializationCall = state === undefined;
    if (branch !== reducerName && !isInitializationCall) {
      return state;
    }
    return reducerFunction(state, action);
  };
}

export default function reducer(state = initialImmutableState, action = {}) {
  const { error, result, branch } = action;
  switch (action.type) {
    case `${branch}/${CLEAR}`:
      return initialImmutableState;

    case `${branch}/${LOAD}`:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', true);
      });
    case `${branch}/${LOAD_SUCCESS}`:
      return state.withMutations((mutableState) => {
        mutableState
          .set('loading', false)
          .set('loaded', true)
          .set('records', result.get('records'));
      });
    case `${branch}/${LOAD_FAIL}`:
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

export function clear(branch) {
  return {
    branch,
    type: `${branch}/${CLEAR}`,
  };
}

export function load(branch) {
  return {
    branch,
    types: [
      `${branch}/${LOAD}`,
      `${branch}/${LOAD_SUCCESS}`,
      `${branch}/${LOAD_FAIL}`,
    ],
    promise: client => client.get(`/api/${branch}`)
  };
}
