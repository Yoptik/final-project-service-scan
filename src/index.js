import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import Store from './store/store';


// const store = new Store();
// //здесь создаем доступ всех компонентов к файлу store
// export const Context = createContext (store)
// console.log("store = " , store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Context.Provider value={store}>
    <React.StrictMode>
       <App />
    </React.StrictMode>
  // </Context.Provider>
)
