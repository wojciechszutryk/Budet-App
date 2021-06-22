import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import './indexStyle';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import store from 'data/store';

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);

reportWebVitals();
