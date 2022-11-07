const express = require('express');
const passport = require('passport');
const userModel = require('./models/user')
const jwt = require('jsonwebtoken')

const blogsRouter = require('./routes/blogs')

require('./db').connectToMongoDB() // Connect to MongoDB
require('dotenv').config()

const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Sign Up
app.post('/signup', async (req, res, next) => {
    try {
    const {email, password} = req.body;
    if(!email || !password){
        return next(new Error("email and password required"))
    }
    const user = await userModel.create({email, password})
    const payload = { user: {id: user._id, email: user.email} } 
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
    user.password = undefined //a trick to prevent the password from being displayed, does not affect the actual password.
    return res.status(200).json({token, user})
    } catch (error) {
    console.log(error)
    res.status(500).send("Something broke")
    }
    })
    

// Log In
app.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return next(new Error("email and password required"))
        }
        const user = await userModel.findOne({email})
        if(!user) return next(new Error("User does not exist"))
        const isValidPassword = await user.isValidPassword(password)
        if(!isValidPassword) return next(new Error("password is incorrect !"))
        const payload = { user: {id: user._id, email: user.email} } 
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
        user.password = undefined //a trick to prevent the password from being displayed, does not affect the actual password.
        return res.status(200).json({token, user}) 
        } catch (error) {
        console.log(error)
        res.status(500).send("Something broke")
        }
    })
    
app.use('/blogs', blogsRouter) 

app.get('/', (req, res) => {
    res.send('Welcome to the blog API, Log in or Sign up to access your blogs');
})

const PORT = process.env.PORT 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
