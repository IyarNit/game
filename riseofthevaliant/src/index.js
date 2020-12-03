import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App.jsx";
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"
import Store from "../src/store/store"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
Store.subscribe(() => {
  console.log("state", Store.getState())
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
