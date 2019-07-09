import * as React from "react";
import { Query } from "react-apollo";
import { HelmetHelper } from "@joincivil/components";
import { Boost } from "./Boost";
import { boostFeedQuery } from "./queries";
import * as boostCardImage from "../../../images/boost-card.png";

export const BoostFeed: React.FunctionComponent = () => {
  const search = {
    postType: "boost",
  };

  return (
    <>
      <HelmetHelper
        title={"Civil Boosts - The Civil Registry"}
        description={"Civil Boosts are mini-fundraisers that build community around journalists' work."}
        image={boostCardImage}
        meta={{
          "og:site_name": "Civil Registry",
          "og:type": "website",
          "twitter:card": "summary",
        }}
      />
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
