import { gql } from "@apollo/client";

export const GET_COLLECTION = gql`
  query GetMyCollection {
    getMyCollection {
      _id
      title
      imageName
      series
      price
      randomexampleprice
    }
  }
`;

export const GET_WISHLIST = gql`
  query GetWishlist {
    getWishlist {
      _id
      title
      imageName
      series
      price
      randomexampleprice
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
      randomexampleprice
    }
  }
`;

export const GET_CART = gql`
  query GetCart {
    getCart {
      _id
      title
      imageName
      series
      price
      randomexampleprice
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query getUserProfile($username: String!) {
    getUserProfile(username: $username) {
      username
      bio
      avatar
      forSale {
        _id
        title
        price
        imageName
      }
      myCollection {
        _id
        title
        imageName
      }
      wishlist {
        _id
        title
        imageName
      }
    }
  }
`;
