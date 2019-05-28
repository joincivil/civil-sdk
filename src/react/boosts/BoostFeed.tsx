import * as React from "react";
import { Query } from "react-apollo";
import { Boost } from "./Boost";
import { boostFeedQuery } from "./queries";

export const BoostFeed: React.FunctionComponent = () => {
  return (
    <>
      <Query query={boostFeedQuery}>
        {({ loading, error, data }) => {
          if (loading) {
            return "Loading...";
          } else if (error) {
            return "Error: " + JSON.stringify(error);
          }

          // @TODO temporary mapping until boost endpoints are up
          return data.listings.map((boost: any, i: number) => <Boost key={i} />);
        }}
      </Query>
    </>
  );
};
