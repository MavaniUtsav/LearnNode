const User = require("../model/user.model");
const bcrypt = require('bcrypt');
const { userService } = require("../services");
const jwt = require('jsonwebtoken');
const { ref } = require("joi");

const accessRefreshToken = async (userId) => {
    try {
        const user = await User.findOne({ _id: userId })

        const accessToken = await jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                address: user.address
            },
            `${process.env.ACCESS_TOKEN_KEY}`,
            { expiresIn: `${process.env.ACCESS_TOKEN_EXPIRY}` } // 1 DAYS
        )

        const refreshToken = await jwt.sign(
            {
                _id: user._id,
            },
            `${process.env.REFRESH_TOKEN_KEY}`,
            { expiresIn: `${process.env.REFRESH_TOKEN_EXPIRY}` } // 15 DAYS
        )

        user.refresh_token = refreshToken

        await user.save()

        return { accessToken, refreshToken }
    } catch (error) {

    }
}


const registerUser = async (req, res) => {
    try {
        const { email, mobile_no, password } = req.body
        console.log(email, mobile_no);
        //checking if user already exists or not
        const userExists = await User.findOne({
            $or: [{ email }, { mobile_no }]
        }).exec();

        if (userExists) {
            return res.status(400).json({
                message: "User already exists!!"
            })
        }

        const hashPass = await bcrypt.hash(password, 10)

        const user = await userService.registerUser({ ...req.body, password: hashPass })

        if (!user) {
            return res.status(400).json({
                message: "Internal Error!!"
            })
        }

        const filterOne = await User.findById(user._id).select("-password -refresh_token")

        res.status(200).json({
            success: true,
            message: 'User Registered Successfully',
            Data: filterOne
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        const comparePass = await bcrypt.compare(password, user.password)

        if (!comparePass) {
            return res.status(500).json({
                message: 'email/password incorrect!!'
            })
        }

        const { accessToken, refreshToken } = await accessRefreshToken(user._id)

        const userData = await User.findOne(user._id).select("-password -refresh_token")

        const options = {
            httpOnly: true,
            secure: true
        }
        
        res.cookie('accessToken', accessToken, options)
        res.cookie('refreshToken', refreshToken, options)

        res.status(200).json({
            success: true,
            data: { ...userData, access_token: accessToken },
            message: 'Login successfully.'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    registerUser,
    loginUser
}