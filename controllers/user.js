const Blog = require('../models/user');
//const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const create = async(req, res) => {
    try{
        const blog = new Blog({
            Blog_Title: req.body.Blog_Title,
            Description: req.body.Description,
            Author_Name: req.body.Author_Name,
        });

        const newBlog = await blog.save();
        res.status(201).json({message: 'Blog registration successfull!', data:newBlog});

    }catch(err){
        res.status(400).json({message: err.message});
    }
}

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        
        if (blogs.length === 0) {
            return res.status(200).json({ message: 'Blog House is empty' });
        }

        res.status(200).json({ data: blogs });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const fetch = async(req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            res.status(400).json({ message: 'Blog not found' });
        }else{
            
            res.status(200).json({message: 'Blog details fetched successfully!', data: blog });
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
    
};


 
const update = async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid blog ID" });
      }
  
      const updates = req.body;
      const blog = await Blog.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true, // Ensure that updates are validated
      });
  
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res
        .status(200)
        .json({ message: "Blog updated successfully!", data: blog });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };


const deleteBlog = async (req, res) => {
    try {
        console.log('Delete Blog called');
        const blogId = req.params.id;
        const blog = await Blog.findByIdAndDelete(blogId);

        if (!blog) {
            console.log('Blog not found');
            return res.status(404).json({ message: 'Blog not found' });
        }

        console.log('Blog deleted');
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message });
    }
};


module.exports = {
    create,
    getAllBlogs,
    fetch,
    update,
    deleteBlog
};