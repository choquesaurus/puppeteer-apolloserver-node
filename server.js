const { ApolloServer, gql } = require('apollo-server');
import  Init from './app';
let arr=[];
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
 class Application{
  constructor(){  
    this.server;
    this.loadData();
  }
  async loadData(){
      arr=await Init();
      this.server()
      this.start();
      console.log(arr,"dataso xdd")
  }
   server(){
    this.server=new ApolloServer({typeDefs,resolvers})
  }
  start(){
    this.server.listen().then(({url})=>{
      console.log(`🚀  Server ready at ${url}`);
    })
  }
}
new Application()