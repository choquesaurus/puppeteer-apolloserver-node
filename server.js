const { ApolloServer, gql } = require('apollo-server');
import  Init from './app';
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

//    async function go(){
//         const data =await Init();
//         console.log(data)
//     }

const typeDefs = gql`

  type Contact {
    nombre: String
    urlimage:String
    ocupacion:String
  }
  type Query {
    Contactos: [Contact]
  }
`;

const resolvers={
    Query:{
        Contactos:async ()=> await Init()
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});