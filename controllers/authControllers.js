const User = require('../models/user')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    try {
        const {name, phone, email, password} = req.body
        if(!name) {
            return res.json({
                error: 'name is required'
            })
        }
        if(!phone || phone.length < 10) {
            return res.json({
                error: 'Phone number is required and should be 10 digits'
            })
        }
        if(!password || password.length < 8) {
            return res.json({
                error: 'Password is required and should be at least 8 characters long'
            })
        }
        const exist = await User.findOne({email})
        if(exist){
            return res.json({
                error: 'Email already exist'
            })
        }
        const hashedPassword = await hashPassword(password)
        const user = await User.create({
            name, 
            phone, 
            email, 
            password: hashedPassword,
        })
        return res.json(user)
    } catch (error) {
        res.json(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user) {
            return res.json({
                error: 'User not found'
            })
        }

        const match = await comparePassword(password, user.password)
        if(match) {
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err
                res.json({message:"Login Succesful", user:user, token})
            })
        }
        if(!match){
            res.json({
                error: 'Password is incorrect'
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const getProfile = (req, res) => {
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err
            res.json(user) 
        })
    } else{
        res.json(null)
    }
}

module.exports = {
    registerUser,
    loginUser,
    getProfile
}