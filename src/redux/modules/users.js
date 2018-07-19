// @flow

import { createSelector } from 'reselect';

export const STATE_KEY = 'users';

// Action types
export const ACTIONS_TYPES = {
  CLEAR: `${STATE_KEY}/CLEAR`,
  LOAD: `${STATE_KEY}/LOAD`,
  LOAD_SUCCESS: `${STATE_KEY}/LOAD_SUCCESS`,
  LOAD_FAIL: `${STATE_KEY}/LOAD_FAIL`,
};

export type User = {
  id: number;
  name: string;
};

export type UsersState = {
  error: any;
  loading: boolean;
  loaded: boolean;
  records: Array<User>;
};

export const initialState: UsersState = {
  error: null,
  loading: false,
  loaded: false,
  records: [],
};

export type UserAction = {
  error: any;
  result: any;
  type: string;
};

// Reducer
export default function reducer(
  state: UsersState = initialState,
  action: UserAction
) {
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

/*
* Getters
*/

export const getUsers = (state: any) => state[STATE_KEY];
export const getUsersRecords = (state: any) => getUsers(state).records;
export const getUsersLoading = (state: any) => getUsers(state).loading;
export const getUsersLoaded = (state: any) => getUsers(state).loaded;
export const getUsersError = (state: any) => getUsers(state).error;

export const GETTERS = {
  getUsers,
  getUsersRecords,
  getUsersLoading,
  getUsersLoaded,
  getUsersError,
};

/*
* Selectors
*/

export const usersRecords = createSelector(getUsersRecords, c => c);
export const usersLoading = createSelector(getUsersLoading, c => c);
export const usersLoaded = createSelector(getUsersLoaded, c => c);
export const usersError = createSelector(getUsersError, c => c);

export const SELECTORS = {
  usersRecords,
  usersLoading,
  usersLoaded,
  usersError,
};

/*
* Actions
*/

export function clear() {
  return {
    type: ACTIONS_TYPES.CLEAR,
  };
}

export function load() {
  return {
    types: [ACTIONS_TYPES.LOAD, ACTIONS_TYPES.LOAD_SUCCESS, ACTIONS_TYPES.LOAD_FAIL],
    promise: (client: any) => client.get(`/api/${STATE_KEY}`),
  };
}

export const ACTIONS = {
  clear,
  load,
};
