const typeDefs = `

type Query {
  getFunko(searchTerm: String!, limit: Int!): [Funko]
  user(_id: ID!): User
  getWishlist: [Funko]
  getMyCollection: [Funko]
  getCart: [Funko]
}


type Funko {
     _id: ID!
    title: String!
    handle: String!
    imageName: String!
    series: [String] 
    price: Float
    randomexampleprice: Float
}

type User {
  _id: ID!
  username: String!
  email: String!
  password: String!
  myCollection: [Funko]  
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
addFunkoToMyCollection(funkoId: ID!): User
addFunkoToWishlist(funkoId: ID!): User
AddFunkoToCart(funkoId: ID!): User
deleteFunko(funkoId: ID!, collection: String!): User
}
`;

module.exports = typeDefs;
