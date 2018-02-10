import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import { fromJS } from 'immutable';

import createMiddleware from '../../middleware/clientMiddleware';
import ApiClient from '../../../helpers/ApiClient';
import config from '../../../config';

import reducer, {
  initialImmutableState,
  STATE_KEY,
  CLEAR,
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  clear,
  load,
} from '../users';

const client = new ApiClient();
const middlewares = [createMiddleware(client)];
const mockStore = configureMockStore(middlewares);
let store;

beforeEach(() => {
  store = mockStore({});
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

  describe(`${STATE_KEY} actions`, () => {
    it('should return clean initial state', () => {
      store.dispatch(clear());
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

      store.dispatch(load())
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

      store.dispatch(load())
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
