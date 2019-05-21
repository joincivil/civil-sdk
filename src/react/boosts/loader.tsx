/** Proof-of-concept loader - this will instantiate the boost component on the page element with id `civil-boost`. */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Boost } from "./Boost";

function init(): void {
  ReactDOM.render(
    <Boost />,
    document.getElementById("civil-boost"),
  );
}

if (document.readyState === "complete") {
  init();
} else {
  window.addEventListener("load", init);
}
