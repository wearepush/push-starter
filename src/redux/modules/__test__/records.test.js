import configureMockStore from 'redux-mock-store';
import { fromJS } from 'immutable';

import createMiddleware from '../../middleware/clientMiddleware';
import ApiClient from '../../../helpers/ApiClient';

import reducer, {
  initialImmutableState,
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  load,
  clear,
} from '../records';

const client = new ApiClient();
const middlewaresiddlewares = [createMiddleware(client)];
const mockStore = configureMockStore(middlewares);

describe('records reducer', () => {
  describe('INIT', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialImmutableState);
    });
  });

  const branch = 'users';

  describe('LOAD', () => {
    it('should return loading status', () => {
      const action = {
        branch,
        type: `${branch}/${LOAD}`
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
        branch,
        type: `${branch}/${LOAD_SUCCESS}`,
        result: fromJS({
          records: []
        })
      };
      expect(reducer(undefined, action).toJS())
        .toEqual(
          expect.objectContaining({
            loaded: true,
            loading: false,
          })
        );
    });

    it('should return failed loaded status', () => {
      const action = {
        branch,
        type: `${branch}/${LOAD_FAIL}`,
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

    it('should return success loaded list', () => {
      const store = mockStore({});
      return store.dispatch(load(branch)).then(() => {
        let data = {};
        store.getActions().map(action => data = reducer(undefined, action)); // eslint-disable-line
        expect(data.get('records').size > 0).toEqual(true);
      });
    });
  });

  describe('CLEAR', () => {
    it('should return clear values', () => {
      const store = mockStore({});
      store.dispatch(clear(branch));
      let data = {};
      store.getActions().map(action => data = reducer(undefined, action));  // eslint-disable-line
      expect(data).toEqual(initialImmutableState);
    });
  });
});
