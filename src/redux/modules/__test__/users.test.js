import nock from 'nock';
import { fromJS } from 'immutable';

import mockStore from '../../__mocks__/store';
import config from '../../../config';

import reducer, {
  initialImmutableState,
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
    fromJS({
      [STATE_KEY]: initialImmutableState
    })
  );
});

afterEach(() => {
  nock.cleanAll();
  nock.restore();
});

describe(`${STATE_KEY} module`, () => {
  describe(`${STATE_KEY} reducer`, () => {
    it('should return initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialImmutableState);
    });

    it('should return clean initial state', () => {
      const action = {
        type: CLEAR
      };
      expect(reducer(undefined, action)).toEqual(initialImmutableState);
    });

    it('should return loading status', () => {
      const action = {
        type: LOAD
      };
      expect(reducer(undefined, action).toJS())
        .toEqual(
          expect.objectContaining({
            loading: true,
          })
        );
    });

    it('should return success loaded status', () => {
      const action = {
        type: LOAD_SUCCESS,
        result: fromJS({
          records: []
        })
      };
      expect(reducer(undefined, action).toJS())
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
        error: fromJS({
          message: 'failed'
        })
      };
      expect(reducer(undefined, action).toJS())
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
      expect(getUsers(state)).toBe(initialImmutableState);
    });

    it(`should return ${STATE_KEY} records state`, () => {
      const state = store.getState();
      expect(getUsersRecords(state)).toBe(initialImmutableState.get('records'));
    });

    it(`should return ${STATE_KEY} loading state`, () => {
      const state = store.getState();
      expect(getUsersLoading(state)).toBe(initialImmutableState.get('loading'));
    });

    it(`should return ${STATE_KEY} loaded state`, () => {
      const state = store.getState();
      expect(getUsersLoaded(state)).toBe(initialImmutableState.get('loaded'));
    });

    it(`should return ${STATE_KEY} error state`, () => {
      const state = store.getState();
      expect(getUsersError(state)).toBe(initialImmutableState.get('error'));
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
      expect(data).toEqual(initialImmutableState);
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
          expect(data.toJS()).toEqual(
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
          expect(data.toJS()).toEqual(
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
