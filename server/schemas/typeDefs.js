const typeDefs = `

type Query {
getFunko: Funko
}

type Funko {
_id: ID!
name: String!
description: String!
price: Int!
seller: String!
}

type User {
_id: ID!
userName: String!
email: String!
password: String!
}

type Auth {
token: ID!
user: User
}

type Mutation {
signUp(userName: String!, email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;
