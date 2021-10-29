// const express=require('express');
// const bodyParser=require('body-parser');
// const {graphqlHTTP}=require('express-graphql');
// const{buildSchema, gql }=require('graphql');


// const app=express()

// const blog=[];

// app.use(bodyParser .json());
// app.get('/graphql', graphqlHTTP({
//     schema:buildSchema(gql`
//     type Blog{
//         id:String!
//         title:String!
//         text:String!
//         date:String
//     }
//     type Comments{
//         id:String!
//         text:String!
//     }
//     input blogInput{
//         title:String!
//         text:String!
//         date:String
//     }
//     input commentsInput{

//     }
//     type blogQuery{
//         blogs:[Blog!]!
//     }
//     type blogMutation{
//         createBlog(text:String):String
//     }
//     schema{
//         query:blogQuery
//         mutation:blogMutation
//     }`),
//     rootValue:{
//         blogs:()=>{
//          return blogs;
//         },
//         createBlog:(arg)=>{
//             //const blogText=arg.text
//             //return blogText
//             const blog={
//                 _id:"123456",
//                 title:arg.blogInput.title,
//                 text:arg.blogInput.text,
//                 date:new Date().toISOString
//             }
//             blogs.push(blog)
//             return blog;
//         }
        
//     },
//     graphiql:true
    
// }))
 
// app.get('/',(request,response,next)=>{response.send('Our app is alive')});

// app.listen(5000)

const { ApolloServer, gql } = require("apollo-server")

const blogs=[];

const app = new ApolloServer({
    typeDefs: gql`
        type Blog{
            _id:String!
            title:String!
            text:String!
            date:String
        }

        type Comments{
            id:String!
            text:String!
        }

        input blogInput{
            title:String!
            text:String!
        }

        input commentsInput{
            text: String!
        }

        type Query {
            blogs: [Blog!]!
        }

        type Mutation {
            createBlog(input: blogInput!): Blog
        }
    `,
    resolvers: {
        Query: {
            blogs:()=>{
                return blogs;
            },
        },
        Mutation: {
            createBlog:(parent, args, context, info)=>{
                //const blogText=arg.text
                //return blogText
                const blog={
                    _id:"123456",
                    title:args.input.title,
                    text:args.input.text,
                    date:new Date().toISOString()
                }
                blogs.push(blog)
                return blog;
            }
        },
    }
})

app.listen(5000)