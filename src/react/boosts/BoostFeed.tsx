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
        title={"Civil Boosts: Support the work that journalists do - The Civil Registry"}
        description={
          "Newsrooms around the world need your help to fund and start new projects. Support these newsrooms by funding their Boosts to help them hit their goals. Good reporting costs money, and the Civil community is making it happen."
        }
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
            <Boost key={i} boostId={boost.id} open={false} disableOwnerCheck={true} disableHelmet={true} />
          ));
        }}
      </Query>
    </>
  );
};
