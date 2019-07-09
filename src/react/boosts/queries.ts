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

export const boostNewsroomQuery = gql`
  query listing($addr: String!) {
    listing(addr: $addr) {
      name
      url
      contractAddress
      owner
      whitelisted
      charter {
        uri
      }
    }
  }
`;

export const createBoostMutation = gql`
  mutation($input: PostCreateBoostInput!) {
    postsCreateBoost(input: $input) {
      id
    }
  }
`;

export const editBoostMutation = gql`
  mutation($postID: String!, $input: PostCreateBoostInput!) {
    postsUpdateBoost(postID: $postID, input: $input) {
      id
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
