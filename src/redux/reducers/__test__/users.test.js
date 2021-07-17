/* eslint-disable */
import nock from 'nock';
import mockStore from '../../__mocks__/store';
import { host } from '../../../../config/consts';

import reducer, { initialState, STATE_KEY, ACTIONS_TYPES, clearUsers, loadUsers } from '../users/users';
import { getUsersError, getUsersLoaded, getUsersLoading, getUsersRecords } from '../users/usersSelectors';

let store;

beforeEach(() => {
  store = mockStore({
    [STATE_KEY]: initialState,
  });
});

afterEach(() => {
  nock.cleanAll();
  nock.restore();
});

describe(`${STATE_KEY} module`, () => {
  describe(`${STATE_KEY} reducer`, () => {
    it('should return initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should return clean initial state', () => {
      const action = {
        type: ACTIONS_TYPES.CLEAR,
      };
      expect(reducer(undefined, action)).toEqual(initialState);
    });

    it('should return loading status', () => {
      const action = {
        type: ACTIONS_TYPES.LOAD,
      };
      expect(reducer(undefined, action)).toEqual(
        expect.objectContaining({
          loading: true,
        })
      );
    });

    it('should return success loaded status', () => {
      const action = {
        type: ACTIONS_TYPES.LOAD_SUCCESS,
        result: {
          records: [],
        },
      };
      expect(reducer(undefined, action)).toEqual(
        expect.objectContaining({
          records: [],
          loaded: true,
          loading: false,
        })
      );
    });

    it('should return failed loaded status', () => {
      const action = {
        type: ACTIONS_TYPES.LOAD_FAIL,
        error: {
          message: 'failed',
        },
      };
      expect(reducer(undefined, action)).toEqual(
        expect.objectContaining({
          error: {
            message: 'failed',
          },
          loading: false,
          loaded: false,
        })
      );
    });
  });

  describe(`${STATE_KEY} selectors`, () => {
    it(`should return ${STATE_KEY} list`, () => {
      const state = store.getState();
      expect(getUsersRecords(state)).toEqual([]);
    });

    it(`should return ${STATE_KEY} loading state`, () => {
      const state = store.getState();
      expect(getUsersLoading(state)).toBe(false);
    });

    it(`should return ${STATE_KEY} loaded state`, () => {
      const state = store.getState();
      expect(getUsersLoaded(state)).toBe(false);
    });

    it(`should return ${STATE_KEY} error state`, () => {
      const state = store.getState();
      expect(getUsersError(state)).toBe(null);
    });
  });

  describe(`${STATE_KEY} actions`, () => {
    it('should return clean initial state', () => {
      store.dispatch(clearUsers());
      const actions = store.getActions();
      let data = null;
      actions.map((action) => {
        data = reducer(undefined, action);
        return true;
      });
      expect(data).toEqual(initialState);
    });

    it('should return success loaded', () => {
      const payload = {
        records: [{ id: 1 }, { id: 2 }],
      };
      nock(host).get('/api/users').reply(200, payload);

      store
        .dispatch(loadUsers())
        .then(() => {
          const actions = store.getActions();
          let data = null;
          actions.map((action) => {
            data = reducer(undefined, action);
            return true;
          });
          expect(data).toEqual(
            expect.objectContaining({
              ...payload,
              error: null,
              loading: false,
              loaded: true,
            })
          );
        })
        .catch(() => {});
    });

    it('should return failed loaded', () => {
      const payload = {
        error: {
          message: 'failed',
        },
      };
      nock(host).get('/api/users').reply(400, payload);

      store
        .dispatch(loadUsers())
        .then(() => {
          const actions = store.getActions();
          let data = null;
          actions.map((action) => {
            data = reducer(undefined, action);
            return true;
          });
          expect(data).toEqual(
            expect.objectContaining({
              ...payload,
              loading: false,
              loaded: false,
            })
          );
        })
        .catch(() => {});
    });
  });
});
