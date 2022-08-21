import express from "express"
import { graphqlHTTP } from "express-graphql"
import { connectDB } from "./db/index.js"
import schemaGraphQL from "./graphql/schema.js"
import authenticate from "./middlewares/auth.js"


const app = express()

connectDB()

app.use(authenticate)

app.get("/", (req,res) => {
    res.json( `Welcome to my graphql api`)
})

app.use("/graphql", graphqlHTTP({
    schema:schemaGraphQL,
    graphiql: true
}))

app.listen(3000)

console.log("escuchando en puerto 3000");