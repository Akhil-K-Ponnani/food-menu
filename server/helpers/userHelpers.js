import userModel from "../models/userModel.js";
import generateToken from "../config/jwt.js";

export default {
    userSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            let user = await userModel.findOne({ email: userData.email })
            if (user)
                reject("User already Exists.")
            else {
                userModel.create(userData).then((user) => {
                    user = {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        type: user.type,
                        token: generateToken(user._id)
                    }
                    resolve(user)
                }).catch(() =>
                    reject("Signup Failed.")
                )
            }
        })
    },
    userLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let user = await userModel.findOne({ email: userData.email })
            if (user && (await user.verifyPassword(userData.password))) {
                user = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    type: user.type,
                    token: generateToken(user._id)
                }
                resolve(user)
            }
            else
                reject("Invalid Email or Password.")
        })
    },
    updateUser: (userId, userName) => {
        return new Promise((resolve, reject) => {
            userModel.findByIdAndUpdate(userId, { name: userName }, { new: true }).then((user) => {
                resolve(user)
            })
        })
    }
};