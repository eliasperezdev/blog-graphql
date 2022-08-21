import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import createJWT from "../util/auth.js";
import { CommnetType, PostType } from "./types.js";

export const register = {
    type: GraphQLString,
    description: "register a new user and return a token",
    args: {
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        displayName: {type: GraphQLString}
    },
    async resolve(_, args) {
        const {username, email, password, displayName} = args
        const newUser = new User({username, email, password, displayName})
        await newUser.save();

        const token = createJWT({username:newUser.username, _id: newUser._id, email: newUser.email})

        console.log(token);

        return token
    }
}

export const login = {
    type: GraphQLString,
    description: "login user and return a token",
    args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString}
    },
    async resolve(_, args) {
        const { email, password } = args

        const user = await User.findOne({email:email}).select("+password")

        if(!user || password !== user.password) 
            throw new Error("Invalid Credentials")

        const token = createJWT({username:user.username, _id: user._id, email: user.email})

        return token
    }
}

export const createPost = {
    type: PostType,
    description: "create a new post",
    args: {
        title: {type: GraphQLString},
        body: {type: GraphQLString}
    },
    async resolve(_, args, {verifiedUser}) {
        const newPost = new Post({
            title:args.title,
            body: args.body,
            authorId:verifiedUser._id
        })
        await newPost.save()
        return newPost
    }
}

export const updatePost = {
    type: PostType,
    description: "update a post",
    args: {
        title: {type: GraphQLString},
        body: {type: GraphQLString},
        id: {type: GraphQLID}
    },
    async resolve(_, {id,title,body}, {verifiedUser}) {

        if(!verifiedUser) throw new Error("Unauthorized")

        const post = await Post.findOneAndUpdate(
            {_id: id, authorId: verifiedUser._id}, {
                body: body,
                title: title
            },
            {new: true}
            )
        return post
    }
}

export const deletePost = {
    type: GraphQLString,
    description: "delete a post",
    args: {
        postId: {type: GraphQLID}
    },
    async resolve(_,{postId}, {verifiedUser}) {
        if(!verifiedUser) throw new Error("Unauthorized")

        const postDelete = await Post.findOneAndDelete(
            {_id: postId, authorId: verifiedUser._id})
        if(!postDelete) throw new Error("post not found")

        return "Post deleted"
    }
} 

export const createComment = {
    type: CommnetType,
    description: "create a new comment",
    args: {
        comment: {type: GraphQLString},
        postId: {type: GraphQLID}
    },
    async resolve(_, args, {verifiedUser}) {
        const newComment = new Comment({
            comment:args.comment,
            postId: args.postId,
            userId:verifiedUser._id
        })
        await newComment.save()
        return newComment
    }
}
