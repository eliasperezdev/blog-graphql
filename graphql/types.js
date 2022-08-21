import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import Comment from "../models/Comment.js";
import User from "../models/User.js";

export const userType = new GraphQLObjectType({
    name: "UserType",
    description: "The user type",
    fields: {
        id: {type: GraphQLString},
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        displayName: {type: GraphQLString},
        createdAt: {type: GraphQLString}
    }
})

export const PostType = new GraphQLObjectType({
    name: "PostType",
    description: "The post type",
    fields:()=> ({
        id: {type: GraphQLString},
        title: {type: GraphQLString},
        body: {type: GraphQLString},
        author: {type: userType, resolve(parent, args) {
            return User.findById(parent.authorId)
        }},
        comments: {
            type: new GraphQLList(CommnetType),
            resolve(parent){
                return Comment.find({postId: parent.id})
            }
        }
    })
})

export const CommnetType = new GraphQLObjectType({
    name: "CommnetType",
    description: "The comment type",
    fields: {
        id: {type: GraphQLString},
        comment: {type: GraphQLString},
        user: {type: userType, resolve(parent) {
            return User.findById(parent.userId)
        }},
        post: {type: PostType, resolve(parent, args) {
            return Post.findById(parent.postId)
        }},
    }
})