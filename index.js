const express = require('express');//*
const passport = require('passport');//*
const userModel = require('./models/user')
const jwt = require('jsonwebtoken')

const app = express()//*

app.use(passport.initialize())//*
require('./middlewares/passport')//*
app.use(express.urlencoded({ extended: false }));//*
app.use(express.json());//*


const blogsRouter = require('./routes/blogs')//*
const authRouter = require('./routes/auth')//*
    
app.use('/auth', authRouter) //*
app.use('/blogs', blogsRouter) //*


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Interna Server Error";
    return res.status(statusCode).json({status: "Error !", message})

}) //*

module.exports = app //*