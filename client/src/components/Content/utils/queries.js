import { gql } from "@apollo/client";

export const GET_COLLECTION = gql`
  query GetMyCollection {
    getMyCollection {
      _id
      imageName
      title
    }
  }
`;

export const GET_WISHLIST = gql`
  query GetWishlist {
    getWishlist {
      _id
      imageName
      title
    }
  }
`;
export const GET_SALE = gql`
  query GetSale {
    cart {
      _id
      imageName
      title
    }
  }
`;

export const SEARCH_FUNKOS = gql`
  query SearchFunkos($searchTerm: String!, $limit: Int!) {
    getFunko(searchTerm: $searchTerm, limit: $limit) {
      _id
      title
      imageName
      series
      price
    }
  }
`;
