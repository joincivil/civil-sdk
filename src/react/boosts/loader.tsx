/** Proof-of-concept loader - this will instantiate the boost component on the page element with id `civil-boost`. */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { getApolloClient } from "@joincivil/utils";
import { Boost } from "./Boost";

const apolloClient = getApolloClient();

function init(): void {
  ReactDOM.render(
    // `apolloClient as any` because of bug with types e.g. https://github.com/awslabs/aws-mobile-appsync-sdk-js/issues/166
    <ApolloProvider client={apolloClient as any}>
      <Boost boostId={"15853c01-68e7-46fa-9c53-236f6916fb45"} open={true} />
    </ApolloProvider>,
    document.getElementById("civil-boost"),
  );
}

if (document.readyState === "complete") {
  init();
} else {
  window.addEventListener("load", init);
}
