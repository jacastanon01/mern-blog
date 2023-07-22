import Blog from "../models/Blog.js";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

//@ desc    retrieve all posts
//@ route   GET api/blogs
//@ access  private
const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find();

  if (blogs) {
    // res.status(200).json({blogs})
    res.status(200).json({ blogs });
  } else {
    res.status(404);
    throw new Error("No blogs to display");
  }
});

//@ desc    get blogs from user
//@ route   GET api/blogs/user/:userId
//@ access  private
const getPostsByUser = asyncHandler(async (req, res) => {
    // ? pass in a userId?
  const userBlogs = await Blog.find({ author: req.user._id });
  //console.log(userBlogs)
  res.status(200).json({ userBlogs });
});

//@ desc    get one single blog
//@ route   GET api/blogs/:slug
//@ access  private
const getBlogById = asyncHandler(async (req, res) => {
  // const { slug } = req.params

  const post = await Blog.findOne({_id: req.params.blogId})

  if (post) {
      res.status(200).json({ post })
  } else {
      res.status(400)
      throw new Error("Couldn't find that blog")
  }
});

//@ desc    edit a user's post
//@ route   PUT api/blogs/:blogId
//@ access  private
const updateBlogPost = asyncHandler(async (req, res) => {
    const blog = await Blog.findOne({_id: req.params.blogId})
    if (req.user._id.toString() === blog.author.toString()) {

    } else {
        res.status(401)
        throw new Error("You are not authorized to make changes to this post")
    }
  res.status(200).json({ message: `Hello from ${req.originalUrl}` });
});

//@ desc    create new blog post
//@ route   POST api/blogs
//@access   private
const createNewPost = asyncHandler(async (req, res) => {
  const { title, body } = req.body;
  const blogs = await Blog.create({ title, body, author: req.user._id });
  // await User.findOneAndUpdate(
  //   { _id: req.user._id },
  //   // use $push to push new item to blogs array
  //   { $push: { blogs } },
  //   // set new to true to replace document 
  //   { new: true }
  // );
  if (blogs){

    
    console.log(req.user)
    res.status(200).json({ blogs });
  } else {
    res.status(400)
    throw new Error("can't create new blog")
  }
});

//@ desc    delete blog post
//@ route   DELETE api/blogs/:blogId
//@ access   private
const deleteBlog = asyncHandler(async(req,res) => {
    
    const blog = await Blog.findOne({_id: req.params.blogId})
    console.log(req.user._id)
    console.log("BLog id? : ", blog.author)
    if (req.user._id.toString() === blog.author.toString()) {
        console.log(blog)
       // await User.findByIdAndUpdate({_id: req.user._id}, {$pull: {blogs: blog._id }}, {new: true})
        await Blog.findOneAndDelete({_id: blog._id})
        res.status(200).json({message: "DELETED"})
    } else {
        res.status(401)
        throw new Error("You are unable to delete other user's posts")
    }
})

export {
  createNewPost,
  updateBlogPost,
  getAllBlogs,
  getBlogById,
  getPostsByUser,
  deleteBlog
};
