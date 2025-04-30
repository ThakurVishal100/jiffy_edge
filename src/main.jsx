import { StrictMode } from 'react'
import React, { Fragment } from "react";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import store from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <Fragment>
    <Provider store={store}>
      <App />
    </Provider>
  </Fragment>
);
