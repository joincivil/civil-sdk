/** Proof-of-concept loader - this will instantiate the boost component on the page element with id `civil-boost`. */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { getApolloClient } from "@joincivil/utils";
import { Civil, makeEthersProvider, EthersProviderResult } from "@joincivil/core";
import { CivilContext, buildCivilContext } from "@joincivil/components";
import { Boost } from "./Boost";

const apolloClient = getApolloClient();

const { provider }: EthersProviderResult = makeEthersProvider("1");
const civil = new Civil({ web3Provider: provider });
// @ts-ignore: Getting "Argument of type ... is not assignable to parameter of type ... Types have separate declarations of private property `ethApi`" because `buildCivilContext` is getting `Civil` from its copy of `@joincivil/core` and we're passing in from our copy. In practice, these `ethApi`s will be identical or matching interface.
const civilContext = buildCivilContext(civil);

function init(): void {
  ReactDOM.render(
    // `apolloClient as any` because of bug with types e.g. https://github.com/awslabs/aws-mobile-appsync-sdk-js/issues/166
    <ApolloProvider client={apolloClient as any}>
      <CivilContext.Provider value={civilContext}>
        <Boost boostId={"1bdf971f-54e9-472d-a975-e175c5fccaa1"} open={true} />
      </CivilContext.Provider>
    </ApolloProvider>,
    document.getElementById("civil-boost"),
  );
}

if (document.readyState === "complete") {
  init();
} else {
  window.addEventListener("load", init);
}
