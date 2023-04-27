import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';

import './index.scss';

const rootElem = document.getElementById('root');

if(rootElem){
  const root = ReactDOM.createRoot(rootElem)
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
  );
}


