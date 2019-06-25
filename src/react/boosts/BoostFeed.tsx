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
            <Boost key={i} boostId={boost.id} open={false} boostOwner={false} />
          ));
        }}
      </Query>
    </>
  );
};
