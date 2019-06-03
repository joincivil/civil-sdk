import gql from "graphql-tag";

// @TODO temporarily using listings feed until boost endpoint's are up
export const boostFeedQuery = gql`
  query {
    listings {
      name
    }
  }
`;

export const boostQuery = gql`
  query Boost($id: String!) {
    postsGet(id: $id) {
      channelID
      ... on PostBoost {
        goalAmount
        title
        why
        what
        about
        dateEnd
        items {
          item
          cost
        }
      }
    }
  }
`;

export const boostMutation = gql`
  mutation($input: PostCreateBoostInput!) {
    postsCreateBoost(input: $input) {
      id
      channelID
      goalAmount
      title
      why
      what
      about
      dateEnd
      items {
        item
        cost
      }
    }
  }
`;
