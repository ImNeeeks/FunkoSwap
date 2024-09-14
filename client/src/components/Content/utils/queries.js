import { gql } from '@apollo/client';


export const GET_WISHLIST = gql`
  query GetWishlist {
    wishList {
      _id
      name
    #   description
    #   price
    #   seller
    }
  }
`;

export const SEARCH_FUNKOS = gql`
  query SearchFunkos($searchTerm: String!) {
    getFunko(name: $searchTerm) {
      _id
      name
      description
      price
      seller
    }
  }
`;
