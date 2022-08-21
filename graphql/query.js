import { GraphQLID, GraphQLList, GraphQLString } from "graphql"
import Comment from "../models/Comment.js"
import Post from "../models/Post.js"
import User from "../models/User.js"
import { CommnetType, PostType, userType } from "./types.js"

export const users = {
    type: new GraphQLList(userType),
    description: "return list of users",
     resolve: async () => {
        const users = await User.find()

        return users
    } 
}

export const user = {
    type: userType,
    description: "return user",
    args:{
        id: {type: GraphQLID}
    },
     resolve: async (_, args) => {
        const user = await User.findOne({_id: args.id})

        return user
    } 
}

export const posts = {
    type: new GraphQLList(PostType),
    description: "return list of post",
     resolve: async () => {
        const posts = await Post.find()

        return posts
    } 
}

export const post = {
    type: PostType,
    description: "return post",
    args:{
        id: {type: GraphQLID}
    },
     resolve: async (_, args) => {
        const post = await Post.findOne({_id: args.id})

        return post
    } 
}

export const comments = {
    type: new GraphQLList(CommnetType),
    description: "return all comment",
     resolve: async () => {
        const comments = await Comment.find()

        return comments
    } 
}

export const comment = {
    type: CommnetType,
    description: "return a comment",
    args:{
        id: {type: GraphQLID}
    },
     resolve: async (_, args) => {
        const comment = await Comment.findOne({_id: args.id})

        return comment
    } 
}