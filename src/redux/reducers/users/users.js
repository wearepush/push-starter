/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

export const STATE_KEY = 'users';

export const initialState = {
  error: null,
  loading: false,
  loaded: false,
  records: [],
};

export const usersSlice = createSlice({
  name: STATE_KEY,
  initialState,
  reducers: {
    clearUsers: (state) => {
      state = initialState;
    },
    loadUsers: (state) => {
      state.loading = true;
    },
    loadUsersSuccess: (state, action) => {
      state.loading = false;
      state.loaded = true;
      state.records = action.data.records;
    },
    loadUsersFailed: (state, action) => {
      console.log('action', action);
      state.loading = false;
      state.loaded = false;
    },
  },
});

export const { clearUsers, loadUsers, loadUsersSuccess, loadUsersFailed } = usersSlice.actions;

export default usersSlice.reducer;
