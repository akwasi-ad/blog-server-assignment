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
            Heading:String!
            likes:Int!
            Author:String!
        }

        type Comments{
            _id:String!
            text:String!
        }

        input blogInput{
            title:String!
            text:String!
            Heading:String!
            likes:Int!
            Author:String!
        }

        input commentsInput{
            text: String!
        }

        type Query {
            blogs: [Blog!]!
            comment:[Comments!]!
        }

        type Mutation {
            createBlog(input: blogInput!): Blog
            createComment(input:commentsInput!):Comments
        }
        
    `,
    resolvers: {
        Query: {
            blogs:()=>{
                return blogs;
            },
            comment:()=>{
                return comment;
            }
        },
        Mutation: {
            createBlog:(parent, args, context, info)=>{
                //const blogText=arg.text
                //return blogText
                const blog={
                    _id:"123456",
                    title:args.input.title,
                    text:args.input.text,
                    Heading:args.input.Heading,
                    likes:args.input.likes,
                    Author:args.input.Author,
                    date:new Date().toISOString()
                    
                }
                blogs.push(blog)
                return blog;
            },
            createComment:(parent, args, context, info)=>{

                const com={
                    _id:"4556",
                    text:args.input.text

                }
                comment.push(com)
                return com;
            }
        },
    }
})

app.listen(5000)