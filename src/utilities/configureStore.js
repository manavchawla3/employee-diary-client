import rootSaga from 'saga';
import reducers from 'reducers';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';

/**
 * logs store update when dispatching
 *
 * @param  {[type]} store [description]
 * @return {[type]}       [description]
 */

const logger = createLogger();

/**
 * create saga middleware
 *
 * @type {[type]}
 */
const sagaMiddleware = createSagaMiddleware();

/**
 * returns list of middlewares
 *
 * @return Array[]
 */
const configureMiddlewares = props => {
  const middlewares = [sagaMiddleware];

  // if (process.env.NODE_ENV === 'development') {
  //   middlewares.push(logger);
  // }

  return middlewares;
};

/**
 * create a store
 * with configured middleware
 * and tell saga to track actions
 */
const configureStore = initialState => {
  const middlewares = configureMiddlewares();

  const store = createStore(reducers, initialState, applyMiddleware(...middlewares));

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
