import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { register, login, createPost, updatePost, deletePost, createComment } from "./mutations.js";
import { users, user, posts, post, comments } from "./query.js";
const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "The root query type",
    fields: {
        users: users,
        user:user,
        posts:posts,
        post:post,
        comments:comments
    }
})

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "The root mutation type",
    fields: {
        register: register,
        login:login,
        createPost:createPost,
        updatePost: updatePost,
        deletePost:deletePost,
        createComment: createComment
    }
})

export default new GraphQLSchema({
query: QueryType,
mutation: MutationType
})
