import gql from "graphql-tag";

const SEARCH = gql`
  query Search($query: ID!) {
    stock(symbol: $query) {
      type
    }
  }
`;
