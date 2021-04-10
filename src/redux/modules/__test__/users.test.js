/* eslint-disable import/no-extraneous-dependencies */
import nock from 'nock';
import mockStore from '../../__mocks__/store';

import reducer, { initialState, STATE_KEY, ACTIONS_TYPES, ACTIONS, GETTERS, SELECTORS } from '../users';

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

  describe(`${STATE_KEY} getters`, () => {
    it(`should return ${STATE_KEY} state`, () => {
      const state = store.getState();
      expect(GETTERS.getUsers(state)).toBe(initialState);
    });

    it(`should return ${STATE_KEY} records state`, () => {
      const state = store.getState();
      expect(GETTERS.getUsersRecords(state)).toBe(initialState.records);
    });

    it(`should return ${STATE_KEY} loading state`, () => {
      const state = store.getState();
      expect(GETTERS.getUsersLoading(state)).toBe(initialState.loading);
    });

    it(`should return ${STATE_KEY} loaded state`, () => {
      const state = store.getState();
      expect(GETTERS.getUsersLoaded(state)).toBe(initialState.loaded);
    });

    it(`should return ${STATE_KEY} error state`, () => {
      const state = store.getState();
      expect(GETTERS.getUsersError(state)).toBe(initialState.error);
    });
  });

  describe(`${STATE_KEY} selectors`, () => {
    it(`should return ${STATE_KEY} list`, () => {
      const state = store.getState();
      expect(SELECTORS.usersRecords(state)).toEqual([]);
    });

    it(`should return ${STATE_KEY} loading state`, () => {
      const state = store.getState();
      expect(SELECTORS.usersLoading(state)).toBe(false);
    });

    it(`should return ${STATE_KEY} loaded state`, () => {
      const state = store.getState();
      expect(SELECTORS.usersLoaded(state)).toBe(false);
    });

    it(`should return ${STATE_KEY} error state`, () => {
      const state = store.getState();
      expect(SELECTORS.usersError(state)).toBe(null);
    });
  });

  describe(`${STATE_KEY} actions`, () => {
    it('should return clean initial state', () => {
      store.dispatch(ACTIONS.clear());
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
      nock('localhost').get('/api/users').reply(200, payload);

      store
        .dispatch(ACTIONS.load())
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
      nock('localhost').get('/api/users').reply(400, payload);

      store
        .dispatch(ACTIONS.load())
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
