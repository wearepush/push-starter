import request from 'supertest';
import httpStatus from 'http-status';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import { fromJS } from 'immutable';

import createServer from './../../server/server';
import createMiddleware from '../../middleware/clientMiddleware';
import ApiClient from '../../../../helpers/ApiClient';

import reducer, {
  initialImmutableState,
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  load,
} from '../records';

const client = new ApiClient();
const middlewares = [createMiddleware(client)];
const mockStore = configureMockStore(middlewares);

describe('records reducer', () => {

  describe('INIT', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialImmutableState)
    });
  });

  const branch = 'user';

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
      // nock(host)
      // .get(`/api/${branch}`)
      // .reply(200, fromJS({ records: [{ id: 1 }] }));

      const store = mockStore({});
      return store.dispatch(load(branch)).then(() => {
        let data = {};
        store.getActions().map(action => data = reducer(undefined, action));
        expect(data.get('records').size > 0).toEqual(true);
      })
    });

    // it('should return success empty list', () => {
    //   nock(host)
    //   .get(`${config.apiPrefix}${branch}/list`)
    //   .reply(204, fromJS({ records: [] }));

    //   const store = mockStore({});
    //   return store.dispatch(load(branch)).then(() => {
    //     let data = {};
    //     store.getActions().map(action => data = reducer(undefined, action));
    //     expect(data.get('records').size).toEqual(0);
    //   })
    // });

    // it('should return failed loaded list', () => {
    //   nock(host)
    //   .get(`${config.apiPrefix}${branch}/list`)
    //   .reply(500, fromJS({ message: 'failed' }));

    //   const store = mockStore({});
    //   return store.dispatch(load(branch)).then(
    //     () => {},
    //     () => {
    //       let data = {};
    //       store.getActions().map(action => data = reducer(undefined, action));
    //       expect(data.getIn(['error', 'message'])).toEqual('failed');
    //     }
    //   )
    // });
  });
})
