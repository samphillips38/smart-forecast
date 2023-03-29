import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

import fakeGet from "./fakeAPI";
import store from "./store";
import { fetchInvestments } from "./investmentsReducer";

store.dispatch(fetchInvestments())

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
