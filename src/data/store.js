import {createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import rootReducer from './reducers'

export default function configureStore(preloadedState) {
    const enhancers = []
    const composedEnhancers = composeWithDevTools(...enhancers);

    const store = createStore(rootReducer, preloadedState, composedEnhancers);

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
    }

    return store;
}