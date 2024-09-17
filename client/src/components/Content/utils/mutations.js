import { gql } from '@apollo/client';

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
      username
      email
    }
  }
`;