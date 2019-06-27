import * as React from "react";
import { Query } from "react-apollo";
import { Boost } from "./Boost";
import { boostFeedQuery } from "./queries";

export const BoostFeed: React.FunctionComponent = () => {
  const search = {
    postType: "boost",
  };

  return (
    <>
      <Query query={boostFeedQuery} variables={{ search }}>
        {({ loading, error, data }) => {
          if (loading) {
            return "Loading...";
          } else if (error) {
            return "Error: " + JSON.stringify(error);
          }

          return data.postsSearch.posts.map((boost: any, i: number) => (
            // `disableOwnerCheck` true because it would be slow to pull up newsroom from web3 for every single boost
            <Boost key={i} boostId={boost.id} open={false} disableOwnerCheck={true} />
          ));
        }}
      </Query>
    </>
  );
};
