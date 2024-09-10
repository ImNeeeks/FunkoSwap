const typeDefs = `

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

type mutation {
signUp(userName: String!, email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;
