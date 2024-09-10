import { gql } from '@apollo/client';


export const ADD_USER = gql`

    mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
        _id
        email
        username

`