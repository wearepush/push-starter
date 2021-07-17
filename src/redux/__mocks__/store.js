/* eslint-disable import/no-extraneous-dependencies */
import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const mockStore = configureMockStore(middlewares);

export default mockStore;
