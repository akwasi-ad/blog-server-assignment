const express=require('express');
const {graphqlHTTP}=require('express-graphql');
const{buildSchema}=require('graphql');


const app=express()


app.get('/graphql',graphqlHTTP({
    schema:buildSchema(`
    type blogQuery{
        blogs:[String!]!

    }
    type blogMutation{
        createBlog(text:String):String
    }
    schema{
        query:blogQuery
        mutation:blogMutation
    }`),
    rootValue:{
        blogs:()=>{
         return['blog text','another blog']
        },
        createBlog:(arg)=>{
            const blogText=arg.text
            return blogText
        }
        
    },
    graphiql:true
    
}))
 
app.get('/',(request,response,next)=>{response.send('Our app is alive')});

app.listen(5000)