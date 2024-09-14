const typeDefs = `

type Query {
  getFunko(name: String): [Funko] 
  listFunkos: [Funko]
  user(_id: ID!): User
  getWishlist: [Funko]
}


input FunkoInput {
    _id: ID!
    title: String!
    handle: String!
    imageName: String!
    description: String
    price: Float

}

type Wishlist {
  _id: ID!
  user: User!
  funkos: [Funko]!
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
addFunkoToWishlist(funkoId: ID!): Funko
deleteFunko(_id: ID!): User
}
`;

module.exports = typeDefs;
