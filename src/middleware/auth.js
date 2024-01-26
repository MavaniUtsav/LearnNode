const jwt = require('jsonwebtoken')
const User = require('../model/user.model')
const { use } = require('../routes/v1/users.routes')

const authMiddleware = async (req, res, next) => {
    try {
        const Token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!Token) {
            return res.status(401).json({
                message: "Access token not provided"
            })
        }

        try {
            const decode = await jwt.verify(Token, `${process.env.ACCESS_TOKEN_KEY}`)
            
            const user = await User.findById(decode.id).select("-password -refresh_token")

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                })
            }

            req.user = user
            next()
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({
                    message: 'Access token has expired',
                });
            }

            return res.status(400).json({
                message: "Invalid access token!"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

module.exports = authMiddleware