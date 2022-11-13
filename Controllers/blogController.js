const express = require('express')
const blog = require('../models/blog')
const user = require('../models/user')
const passport = require('passport')

require('../middlewares/passport')

const app = express()

// CRUD controller functions

// Get all Blogs ✔
async function getAllBlogs(req, res, next) {
    try {
        let blogs = blog.find()
        
        if(req.query.sort){
            blogs = blogs.sort(req.query.sort)
        }  

        // pagination
        let page = +req.query.page || 1
        const limit = 20
        const skip = (page - 1) * limit
        
        blogs = blogs.skip(skip).limit(limit)
        
        // Filtering (searching) by author, title and Tags
        if(req.query.author){
            const searchByAuthor = await blogs.find({author: req.query.author})
            res.json(searchByAuthor)
        }else if(req.query.title){
            const searchByTitle = await blogs.find({title: req.query.title})
            res.json(searchByTitle)
        }else if(req.query.tags){
            const searchByTags = await blogs.find({tags: req.query.tags})
            res.json(searchByTags)
        }else{
            const theBlogs = await blogs
            res.json(theBlogs)
        }
            } catch (err) {
        next(err)
    }
}

// Get single blog by ID ✔
async function getSingleBlog(req, res, next) {
    try {
        const id = req.params.id
        const singleBlog = await blog.find({_id: id}).populate("author_id", "-password")
        singleBlog[0].read_count += 1
        res.status(200).send({ message: `Hi ${singleBlog[0].author}, Your Email is ${singleBlog[0].author_id.email}` , data: singleBlog })
    } catch (err) {
        next(err)
    }
}


// Get Published Blogs ✔
async function getPublishedBlogs(req, res, next) {
    
    try {
        let publishedBlogs = blog.find({state: 'published'})

        // Sorting {use read_count, reading_time & timestamp}
        if(req.query.sort){
            publishedBlogs = publishedBlogs.sort(req.query.sort)
        }  

        // pagination
        let page = +req.query.page || 1
        const limit = 20
        const skip = (page - 1) * limit
        
        publishedBlogs.skip(skip).limit(limit)
        
        // Filtering (searching) by author, title and Tags
        if(req.query.author){
            const searchByAuthor = await publishedBlogs.find({author: req.query.author})
            res.json(searchByAuthor)
        }else if(req.query.title){
            const searchByTitle = await publishedBlogs.find({title: req.query.title})
            res.json(searchByTitle)
        }else if(req.query.tags){
            const searchByTags = await publishedBlogs.find({tags: req.query.tags})
            res.json(searchByTags)
        }else{
            const thePublishedBlogs = await publishedBlogs
            res.json(thePublishedBlogs)
        }

    } catch (err) {
        next(err)
    }
}

// An owner getting his blogs ✔
async function getOwnerBlog(req, res, next) {
    try {
        const id = req.params.id
        let ownerBlog = blog.find({author_id: id})
        
        // pagination
        if (req.query.page){
            let page = +req.query.page || 1
            const limit = 20
            const skip = (page - 1) * limit
            ownerBlog = ownerBlog.skip(skip).limit(limit)
        }


        // Filtering by state
        if(req.query.state == 'draft'){
          const draftedBlogs = await ownerBlog.find({state: 'draft'})
          res.json(draftedBlogs)  
        }
        else if(req.query.state == 'published'){
            const publishedBlogs = await ownerBlog.find({state: 'published'})
            res.json(publishedBlogs)
        }else{
            //if state filter is not declared
            const theOwnerBlogs = await ownerBlog
            res.json(theOwnerBlogs)
        }
    } catch (err) {
        next(err)
    }
}

// An owner updating his blog to published ✔
async function updateOwnerBlog(req, res, next){
    try {
        const id = req.params.id
        const newUpdate = req.body
        const updatedBlog = await blog.findOneAndUpdate({author_id: id, state: 'draft'}, newUpdate, {new: true})
        // await updateBlog.save()
        res.json(updatedBlog)
    } catch (error) {
        next(error)
    }
}    


// Create A Blog ✔
// the owner of thi blog should input his "user id" in the "author_id" field   
async function addBlog(req, res, next) {
    let blogContent = req.body;
    blogContent.timestamp = new Date()
    
    try {
        const newBlog = await blog.create(blogContent);
        res.status(201).json(newBlog);
    } catch (error) {
        next(error);
    }
}

// Delete a Blog ✔
async function deleteBlog(req, res, next) {
    const id = req.params.id
     try {
        const blogToBeDeleted = await blog.findOneAndDelete({author_id: id})
        const blogs = await blog.find()
        res.json(blogs);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getAllBlogs,
    getOwnerBlog,
    getSingleBlog,
    getPublishedBlogs,
    updateOwnerBlog,
    addBlog,
    deleteBlog
}