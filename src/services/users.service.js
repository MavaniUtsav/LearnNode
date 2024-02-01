const User = require("../model/user.model")

const registerUser = (reqBody) => {
    //   console.log("Register User");
    return User.create(reqBody)
}

const updateUser = () => {
    
}

module.exports = {
    registerUser,
}