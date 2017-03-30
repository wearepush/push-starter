// @flow
import cookie from 'react-cookie';
import config from 'config';
import { executionEnvironment } from 'utils/helpers';

const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';

// const LOGOUT = 'auth/LOGOUT';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';

const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'auth/REGISTER_FAIL';

// const SEND_PASS_RESTORE = 'auth/SEND_PASS_RESTORE';
// const SEND_PASS_RESTORE_SUCCESS = 'auth/SEND_PASS_RESTORE_SUCCESS';
// const SEND_PASS_RESTORE_FAIL = 'auth/SEND_PASS_RESTORE_FAIL';
//
// const RESTORE_PASS = 'auth/RESTORE_PASS';
// const RESTORE_PASS_SUCCESS = 'auth/RESTORE_PASS_SUCCESS';
// const RESTORE_PASS_FAIL = 'auth/RESTORE_PASS_FAIL';
//
// const SOCIAL_AUTH = 'auth/SOCIAL_AUTH';
// const SOCIAL_AUTH_SUCCESS = 'auth/SOCIAL_AUTH_SUCCESS';
// const SOCIAL_AUTH_FAIL = 'auth/SOCIAL_AUTH_FAIL';

const UPDATE_USER = 'profile/UPDATE_USER';
const UPDATE_USER_SUCCESS = 'profile/UPDATE_USER_SUCCESS';
const UPDATE_USER_FAIL = 'profile/UPDATE_USER_FAIL';

const VERIFY_CODE_SUCCESS = 'profile/VERIFY_CODE_SUCCESS';

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

    case UPDATE_USER:
      return { ...state, updating: true };
    case UPDATE_USER_SUCCESS:
      return { ...state, updating: false, updated: true, user: action.result.user, error: null };
    case UPDATE_USER_FAIL:
      return { ...state, updating: false, updated: false, error: action.error };

    case VERIFY_CODE_SUCCESS:
      return { ...state, user: { ...state.user, profile: { ...state.user.profile, phone_confirmed: true } } };

    case LOGIN:
      return { ...state, loggingIn: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loggingIn: false, loaded: true, user: action.result.user, error: null };
    case LOGIN_FAIL:
      return { ...state, loggingIn: false, loaded: false, error: action.error };

    // case REGISTER:
    //   return { ...state, loggingIn: true, error: null };
    // case REGISTER_SUCCESS:
    //   return { ...state, loggingIn: false, loaded: true, user: action.result.user, error: null };
    // case REGISTER_FAIL:
    //   return { ...state, loggingIn: false, loaded: false, error: action.error };

    default:
      return state;
  }
}

const saveToken = (data) => { // eslint-disable-line
  if (executionEnvironment().canUseDOM) {
    cookie.save(config.apiTokenKey, data.token, { path: '/' });
  }
  return data;
};

export function logIn({ email, password }) {
  return dispatch =>
    dispatch({
      types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
      promise: client =>
        client.post('tokens', { data: { email, password } }).then(saveToken)
    });
}

export function register({ email, password }) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: client => client.post('accounts', { data: { email, password, password_confirmation: password } })
  };
}

export function load() {
  return dispatch =>
    dispatch({
      types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
      promise: client => client.get('tokens')
    });
}
//
// export function logOut() {
//   return {
//     types: ['', LOGOUT, ''],
//     promise: client => client.del('/auth/sign_out')
//   };
// }
//
// export function changePass(data) {
//   return {
//     types: ['', '', ''],
//     promise: client => client.put('/auth/password', { data })
//   };
// }
//
// export function resetPass(data) {
//   return {
//     types: ['', '', ''],
//     promise: client => client.post('/auth/password', { data: { ...data, redirect_url: '/reset_password' } })
//   };
// }

// old functions

export function isLoaded(store) {
  return !!store.auth && !!store.auth.user;
}
//
// export function confirm(confirm_code) {
//   return {
//     types: [CONFIRM, CONFIRM_SUCCESS, CONFIRM_FAIL],
//     promise: client => client.get('/confirm', { params: { confirm_code } }).then(saveTokens)
//   };
// }
//
// export function sendPasswordRestore({ login }) {
//   return {
//     types: [SEND_PASS_RESTORE, SEND_PASS_RESTORE_SUCCESS, SEND_PASS_RESTORE_FAIL],
//     promise: client => client.get('/send-restore', { params: { login } })
//   };
// }
//
// export function restorePassword({ restore_code, password }) {
//   return {
//     types: [RESTORE_PASS, RESTORE_PASS_SUCCESS, RESTORE_PASS_FAIL],
//     promise: client => client.get('/restore', { params: { restore_code, password } })
//   };
// }
//
// export function socialAuth(token) {
//   return {
//     types: [SOCIAL_AUTH, SOCIAL_AUTH_SUCCESS, SOCIAL_AUTH_FAIL],
//     promise: client => client.get('/facebook-login', { params: { token } }).then(saveTokens)
//   };
// }

