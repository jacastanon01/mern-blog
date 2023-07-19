import jwt from "jsonwebtoken"


// Generate a json web token and save it in an http cookie
// You can add something into the payload of a response with JWT
// We want to use an id to validate a user's token
export const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.SECRET, { expiresIn: '30d' })
    console.log(token)
    res.cookie('jwt',token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", // use secure cookies in prod
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
}