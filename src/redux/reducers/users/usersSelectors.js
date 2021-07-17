import { createSelector } from 'reselect';
import { STATE_KEY } from './users';
import { getState } from '../common/commonGetters';

export const getUsers = createSelector(getState, (state) => state[STATE_KEY]);

export const getUsersRecords = createSelector(getUsers, (users) => users.records);

export const getUsersLoading = createSelector(getUsers, (users) => users.loading);

export const getUsersLoaded = createSelector(getUsers, (users) => users.loaded);

export const getUsersError = createSelector(getUsers, (users) => users.error);
