import nock from 'nock';
import mockStore from '../../__mocks__/store';
import config from '../../../config';

import reducer, {
  initialState,
  STATE_KEY,
  CLEAR,
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  clearUsers,
  loadUsers,
  getUsers,
  getUsersRecords,
  getUsersLoading,
  getUsersLoaded,
  getUsersError,
} from '../users';

let store;

beforeEach(() => {
  store = mockStore(
    {
      [STATE_KEY]: initialState
    }
  );
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
        type: CLEAR
      };
      expect(reducer(undefined, action)).toEqual(initialState);
    });

    it('should return loading status', () => {
      const action = {
        type: LOAD
      };
      expect(reducer(undefined, action))
        .toEqual(
          expect.objectContaining({
            loading: true,
          })
        );
    });

    it('should return success loaded status', () => {
      const action = {
        type: LOAD_SUCCESS,
        result: {
          records: []
        }
      };
      expect(reducer(undefined, action))
        .toEqual(
          expect.objectContaining({
            records: [],
            loaded: true,
            loading: false,
          })
        );
    });

    it('should return failed loaded status', () => {
      const action = {
        type: LOAD_FAIL,
        error: {
          message: 'failed'
        }
      };
      expect(reducer(undefined, action))
        .toEqual(
          expect.objectContaining({
            error: {
              message: 'failed'
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
      expect(getUsers(state)).toBe(initialState);
    });

    it(`should return ${STATE_KEY} records state`, () => {
      const state = store.getState();
      expect(getUsersRecords(state)).toBe(initialState.records);
    });

    it(`should return ${STATE_KEY} loading state`, () => {
      const state = store.getState();
      expect(getUsersLoading(state)).toBe(initialState.loading);
    });

    it(`should return ${STATE_KEY} loaded state`, () => {
      const state = store.getState();
      expect(getUsersLoaded(state)).toBe(initialState.loaded);
    });

    it(`should return ${STATE_KEY} error state`, () => {
      const state = store.getState();
      expect(getUsersError(state)).toBe(initialState.error);
    });
  });

  describe(`${STATE_KEY} actions`, () => {
    it('should return clean initial state', () => {
      store.dispatch(clearUsers());
      const actions = store.getActions();
      let data = null;
      actions.map(action => {
        data = reducer(undefined, action);
        return true;
      });
      expect(data).toEqual(initialState);
    });

    it('should return success loaded', () => {
      const payload = {
        records: [
          { id: 1 },
          { id: 2 }
        ]
      };
      nock(config.testHost)
        .get('/api/users')
        .reply(200, payload);

      store.dispatch(loadUsers())
        .then(() => {
          const actions = store.getActions();
          let data = null;
          actions.map(action => {
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
          message: 'failed'
        }
      };
      nock(config.testHost)
        .get('/api/users')
        .reply(400, payload);

      store.dispatch(loadUsers())
        .then(() => {
          const actions = store.getActions();
          let data = null;
          actions.map(action => {
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
