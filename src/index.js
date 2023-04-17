import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import store from "./store";
import { fetchModels } from "./modelsReducer";

store.dispatch(fetchModels())

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
