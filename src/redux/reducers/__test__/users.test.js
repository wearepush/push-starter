import mockStore from '../../__mocks__/store';

import reducer, {
  initialState,
  STATE_KEY,
  clearUsers,
  loadUsers,
  loadUsersSuccess,
  loadUsersFailed,
} from '../users/users';
import { getUsersError, getUsersLoaded, getUsersLoading, getUsersRecords } from '../users/usersSelectors';

let store;

beforeEach(() => {
  store = mockStore({
    [STATE_KEY]: initialState,
  });
});

describe(`${STATE_KEY} module`, () => {
  describe(`${STATE_KEY} reducer`, () => {
    it('should return initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should return clean initial state', () => {
      const action = {
        type: clearUsers.type,
      };
      expect(reducer(undefined, action)).toEqual(initialState);
    });

    it('should return loading status', () => {
      const action = {
        type: loadUsers.type,
      };
      expect(reducer(undefined, action)).toEqual(
        expect.objectContaining({
          loading: true,
        })
      );
    });

    it('should return success loaded status', () => {
      const action = {
        type: loadUsersSuccess.type,
        payload: {
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
        type: loadUsersFailed.type,
        payload: {
          error: {
            message: 'failed',
          },
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
});
