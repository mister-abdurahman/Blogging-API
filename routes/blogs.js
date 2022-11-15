const express = require('express');
const passport = require('passport')
const blogController = require('../Controllers/blogController');

const app = express()


const blogRouter = express.Router();

// Get all blogs
blogRouter.get('/', blogController.getAllBlogs);

// Get Published Blogs
blogRouter.get('/published', blogController.getPublishedBlogs);

// Create a Blog
blogRouter.post('/', passport.authenticate('jwt', {session: false}),  blogController.addBlog);

// Update a blog (to Published)
blogRouter.put('/owner/:id', passport.authenticate('jwt', {session: false}),blogController.updateOwnerBlog);

// Delete A Blog
blogRouter.delete('/owner/:id', passport.authenticate('jwt', {session: false}) ,blogController.deleteBlog);

// Get Owner Blogs
blogRouter.get('/owner/:id', passport.authenticate('jwt', {session: false}),blogController.getOwnerBlog);

// Get a single Blog
blogRouter.get('/:id', passport.authenticate('jwt', {session: false}), blogController.getSingleBlog);




module.exports = blogRouter