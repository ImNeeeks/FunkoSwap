const typeDefs = `

type Query {
getFunko: Funko
}

type Query {
    getFunko(name:String): Funko
    listFunkos: [Funko]
    user: User
}

input funkoInput {
    _id: ID!
    title: String!
    handle: String!
    imageName: String!
    description: String
    price: Float
}

type Funko {
    _id: ID!
    title: String!
    handle: String!
    imageName: String!
    description: String
    price: Float
    category: String
}

type User {
    _id: ID!
    userName: String!
    email: String!
    password: String!
    collection: [String]
    wishList: [String]
    cart: [String]
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
