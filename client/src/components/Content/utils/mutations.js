import { gql } from "@apollo/client";

// sign up mutation
export const ADD_USER = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// login mutation
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

// Add Funko to Wishlist Mutation
export const ADD_FUNKO_TO_WISHLIST = gql`
  mutation addFunkoToWishlist($funkoId: ID!) {
    addFunkoToWishlist(funkoId: $funkoId) {
      _id
    }
  }
`;

// Add funko to MyCollection mutation
export const ADD_FUNKO_TO_MYCOLLECTION = gql`
  mutation addFunkoToMyCollection($funkoId: ID!) {
    addFunkoToMyCollection(funkoId: $funkoId) {
      _id
    }
  }
`;


export const ADD_FUNKO_TO_CART = gql`
  mutation AddFunkoToCart($funkoId: ID!) {
    AddFunkoToCart(funkoId: $funkoId) {
      _id
    
    }
  }
`;

export const DELETE_FUNKO = gql`
  mutation deleteFunko($funkoId: ID!, $collection: String!) {
    deleteFunko(funkoId: $funkoId, collection: $collection) {
      _id
      username
      myCollection {
        _id
      }
      wishList {
        _id
      }
      cart {
        _id
      }
    }
  }
`;

