const jwt = require('jsonwebtoken')
const User = require('../model/user.model')
const { use } = require('../routes/v1/users.routes')

const authMiddleware = (roles) => async (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            const userRoles = await roles.some((s) => s === req.user.role);

            if (!userRoles) {
                return res.status(401).json({
                    message: 'Access denied',
                });
            }
            
            res.json({
                message: 'Access Done!!'
            })

            next()
        } else {
            const Token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

            if (!Token) {
                return res.status(401).json({
                    message: "Access token not provided"
                })
            }

            await jwt.verify(Token, `${process.env.ACCESS_TOKEN_KEY}`, async function (error, decode) {

                if (error || !roles.some((role) => role == decode.role)) {
                    if (error instanceof jwt.TokenExpiredError) {
                        return res.status(401).json({
                            message: 'Access token has expired',
                        });
                    }

                    return res.status(400).json({
                        message: "Invalid access token!"
                    })
                }

                const user = await User.findById(decode.id).select("-password -refresh_token")

                if (!user) {
                    return res.status(404).json({
                        message: "User not found"
                    })
                }

                req.user = user
                next()
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

module.exports = authMiddleware