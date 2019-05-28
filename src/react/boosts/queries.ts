import gql from "graphql-tag";

// @TODO temporarily using listings feed until boost endpoint's are up
export const boostFeedQuery = gql`
  query {
    listings {
      name
    }
  }
`;
