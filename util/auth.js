import jwt from "jsonwebtoken";
import 'dotenv/config'

const createJWT = user => {
    return jwt.sign({user}, process.env.SECRET,{
        expiresIn: "16h"
    })
}

export default createJWT