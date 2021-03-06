import React from "react";
import ReactDOM from "react-dom";
import {compose, createStore} from "redux";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.scss'

import reducer from "./reducer";
import App from "./App";

const store = createStore(reducer, compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
