import gql from "graphql-tag";

// @TODO temporarily using listings feed until boost endpoint's are up
export const boostFeedQuery = gql`
  query {
    listings {
      name
    }
  }
`;

/* 
  id from test mutation/query https://graphqlbin.com/v2/lRZ3TP
  { "id": "07bcdd89-ff29-46f5-b00a-36949cb02368" }
*/
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
      items {
        item
        cost
      }
    }
  }
`;
