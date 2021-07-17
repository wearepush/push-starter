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
      const keys = Object.keys(initialState);
      for (let i = 0; i < keys.length; i++) {
        const e = keys[i];
        state[e] = initialState[e];
      }
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
      state.error = action.error;
      state.loading = false;
      state.loaded = false;
    },
  },
});

export const { clearUsers, loadUsers, loadUsersSuccess, loadUsersFailed } = usersSlice.actions;

export default usersSlice.reducer;
