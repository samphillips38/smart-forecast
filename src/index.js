import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Amplify, API } from "aws-amplify";
import awsmobile from "./aws-exports";

import App from "./App";
import store from "./store";
import { fetchModels } from "./modelsReducer";

Amplify.configure(awsmobile);
store.dispatch(fetchModels())

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
