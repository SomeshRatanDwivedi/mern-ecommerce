import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';

import { myContext } from './context';
import store from './store';

import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <Provider store={store} >
  <myContext.Provider value='somesh'>
      <App />
  </myContext.Provider>
  </Provider>
);

