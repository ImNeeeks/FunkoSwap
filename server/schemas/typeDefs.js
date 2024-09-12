const typeDefs = `

type Query {
getFunko: Funko
}

type Query {
user: User
}

input funkoInput {
_id: ID!
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
userName: String!
email: String!
password: String!
wishList: [Funko]
}

type Auth {
token: ID!
user: User
}

type Mutation {
signUp(userName: String!, email: String!, password: String!): Auth
login(email: String!, password: String!): User
saveFunko(funkoInput: funkoInput!): Funko
deleteFunko(_id: ID!): User
}
`;

module.exports = typeDefs;
