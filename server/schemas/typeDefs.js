const typeDefs = `

type Query {
  getFunko(searchTerm: String!, limit: Int!): [Funko]
  listFunkos: [Funko]
  user(_id: ID!): User
  getWishlist: [Funko]  
}


input FunkoInput {
    _id: ID!
    title: String!
    handle: String!
    imageName: String!
    series: String
    price: Float

}

type wishList {
  _id: ID!
  user: User!
  funkos: [Funko]!
}


type Funko {
    _id: ID!
    title: String!
    handle: String!
    imageName: String!
    series: String
    price: Float
    category: String
}

type User {
  _id: ID!
  username: String!
  email: String!
  password: String!
  collection: [Funko]  
  wishList: [Funko]    
  cart: [Funko]         
}

type Auth {
    token: ID!
    user: User
}

type Mutation {
signUp(username: String!, email: String!, password: String!): Auth
login(email: String!, password: String!): Auth
addFunkoToWishlist(funkoId: ID!): User
deleteFunko(_id: ID!): User
}
`;

module.exports = typeDefs;
