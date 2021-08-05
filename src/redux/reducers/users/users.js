import { createSlice } from '@reduxjs/toolkit';

export const STATE_KEY = 'users';

export const initialState = {
  error: null,
  loading: false,
  loaded: false,
  records: [],
  // TODO: TEMP DATA TO SET INIT STATE FROM COOKIE
  // DO NOT FORGET TO CLEANUP createSSR.js
  testData: null,
};

export const usersSlice = createSlice({
  name: STATE_KEY,
  initialState,
  reducers: {
    clearUsers: (state) => {
      const keys = Object.keys(initialState);
      for (let i = 0; i < keys.length; i++) {
        const e = keys[i];
        state[e] = initialState[e];
      }
    },
    loadUsers: (state) => {
      state.loading = true;
    },
    loadUsersSuccess: (state, { payload }) => {
      state.loading = false;
      state.loaded = true;
      state.records = payload.records;
    },
    loadUsersFailed: (state, { payload }) => {
      state.error = payload.error;
      state.loading = false;
      state.loaded = false;
    },
  },
});

export const { clearUsers, loadUsers, loadUsersSuccess, loadUsersFailed } = usersSlice.actions;

export default usersSlice.reducer;
