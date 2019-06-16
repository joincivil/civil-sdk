import gql from "graphql-tag";

export const boostFeedQuery = gql`
  query Post($search: PostSearchInput!) {
    postsSearch(search: $search) {
      posts {
        ... on PostBoost {
          id
        }
      }
    }
  }
`;

export const boostQuery = gql`
  query Boost($id: String!) {
    postsGet(id: $id) {
      channelID
      ... on PostBoost {
        currencyCode
        goalAmount
        paymentsTotal(currencyCode: "USD")
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

export const boostPayEthMutation = gql`
  mutation($postID: String!, $input: PaymentsCreateEtherPaymentInput!) {
    paymentsCreateEtherPayment(postID: $postID, input: $input) {
      reaction
      comment
      transactionID
    }
  }
`;
