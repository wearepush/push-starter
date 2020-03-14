/* eslint-disable import/no-extraneous-dependencies */
import configureMockStore from 'redux-mock-store';

import createMiddleware from '../middleware/clientMiddleware';
import ApiClient from '../../helpers/ApiClient';

const client = new ApiClient();
const middlewares = [createMiddleware(client)];
const mockStore = configureMockStore(middlewares);
export default mockStore;
