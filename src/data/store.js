import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import rootReducer from './reducers'
import promiseMiddleware from "./middlewares/promise";
import informationMiddleware from "./middlewares/information";

export default function configureStore(preloadedState) {
    const middlewareEnhancer = applyMiddleware(promiseMiddleware, informationMiddleware);

    const enhancers = [middlewareEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers);

    const store = createStore(rootReducer, preloadedState, composedEnhancers);

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
    }

    return store;
}