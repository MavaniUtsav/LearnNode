const User = require("../model/user.model")
const bcrypt = require('bcrypt');
const { userService } = require("../services");

 
 const registerUser = async (req,res) => {
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
        
        const filterOne = await User.findById(user._id).select("-password")

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

 const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body

        const findUser = await User.findOne({email})
        
        if (!findUser) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        const comparePass = await bcrypt.compare(password ,findUser.password)
        
        if (!comparePass) {
            return res.status(500).json({
                message: 'email/password incorrect!!'
            })
        }

        res.status(200).json({
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