import React from "react";
import { render as react_render } from "react-dom";
import App from "./components/App";
import Controller from "./controller";
import "todomvc-app-css/index.css";
import { Provider } from "./context";

function render(manager) {
  react_render(
    <Provider value={manager}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
}

const manager = new Controller();
manager.state.on("tick", () => render(manager));
render(manager);
