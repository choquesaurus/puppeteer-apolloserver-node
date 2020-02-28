const { ApolloServer, gql } = require('apollo-server');
import  Init from './app';
//    async function go(){
//         const data =await Init();
//         console.log(data)
//     }

let arr=[];
/*
(
  async ()=>{
  arr=await Init();
   console.log(arr,"VALORES DESDE ARR :D")
  }
)();
*/
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
        Contactos:()=>arr
    }
}

// const server = new ApolloServer({ typeDefs, resolvers });
// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });


 class Application{
  constructor(){  
    //this.data=[]
    this.loadData();
    this.server;
  }
  async loadData(){
      arr=await Init();
      this.server=await new ApolloServer({typeDefs,resolvers})
      this.start();
      console.log(arr,"dataso xdd")
  }
  start(){
    this.server.listen().then(({url})=>{
      console.log(`🚀  Server ready at ${url}`);
    })
  }

}
new Application()