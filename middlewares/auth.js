import jwt from "jsonwebtoken";
import 'dotenv/config'

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || ""

    console.log(token);

    try {
        const verified = jwt.verify(token, process.env.SECRET)

        console.log(verified);

        req.verifiedUser = verified.user

        next()
    } catch (error) {
        console.log("Problema con el token",error);
        next()
    }
    
}
export default authenticate