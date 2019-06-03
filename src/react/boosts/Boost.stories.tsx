import * as React from "react";
import { storiesOf } from "@storybook/react";
import apolloStorybookDecorator from "apollo-storybook-react";
import { Boost } from "./Boost";

// @TODO temporarily using listings feed until boost endpoint's are up
const typeDefs = `
  type Listing {
    name: String!
  }

  type Query {
    listings: [Listing!]!
  }

  schema {
    query: Query
  }
`;

const mocks = {
  Query: () => {
    return {
      listings: () => {
        return [
          { name: "abc" },
          { name: "123" },
          { name: "xyz" },
        ];
      },
    };
  },
};

storiesOf("Boosts", module)
  .addDecorator(
    apolloStorybookDecorator({
      typeDefs,
      mocks,
    }),
  )
  .add("Boost List Card", () => <Boost open={false} boostId={""} />)
  .add("Boost Description Card", () => <Boost open={true} boostId={""} />);
