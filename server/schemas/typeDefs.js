const typeDefs = `

type Query {
getFunko(_id: ID!): Funko
user(_id: ID!): User
}

input FunkoInput {
name: String!
description: String!
price: Int!
seller: String!
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
username: String!
email: String!
password: String!
wishList: [Funko]
}

type Auth {
token: ID!
user: User
}

type Mutation {
signUp(username: String!, email: String!, password: String!): Auth
login(email: String!, password: String!): Auth
saveFunko(funkoInput: FunkoInput!): User
deleteFunko(_id: ID!): User
}
`;

module.exports = typeDefs;
