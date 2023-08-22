import Blog from "../models/Blog.js";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

//@ desc    retrieve all posts
//@ route   GET api/blogs
//@ access  private
const getAllBlogs = asyncHandler(async (req, res) => {
  console.time("dbBlogs");
  const blogs = await Blog.find();
  console.timeEnd("dbBlogs");
  console.log("BLOGS: ", blogs);
  // const blogs = await getBlogs.
  //console.log(blogs)

  console.time("populate");
  if (blogs) {
    for await (const blog of blogs) {
      if (!blog.author.name) {
        await blog.populate("author");
        // await blog.save();
      }
      // console.time("user");
      // const user = await User.findById(blog.author.toString());

      // console.timeEnd("user");
    }

    //   console.log(blog + " BLOG BOY")
    console.timeEnd("populate");
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
  const blogs = await Blog.find({ author: req.params.userId });
  console.time("params");
  if (blogs) {
    for await (const blog of blogs) {
      if (!blog.author.name) {
        await blog.populate("author");
        // await blog.save();
      }
    }
    console.timeEnd("params");
    res.status(200).json({ blogs, name: blogs[0].author.name });
  } else {
    res.status(404);
    throw new Error("Blogs not found");
  }
});

//@ desc    get one single blog
//@ route   GET api/blogs/:slug
//@ access  private
const getBlogById = asyncHandler(async (req, res) => {
  // const { slug } = req.params
  console.time("user");
  // const user = await User.findById(req.user.id);
  // console.log("USER", user);
  const post = await Blog.findOne({ _id: req.params.blogId });
  console.timeEnd("user");
  console.time("for loop");
  if (post) {
    if (!post.author.name) {
      await post.populate("author");
      // await post.save();
      console.timeEnd("for loop");
    }
    res.status(200).json({ post });
  } else {
    res.status(404);
    throw new Error("Couldn't find that blog");
  }
});

//@ desc    edit a user's post
//@ route   PUT api/blogs/:blogId
//@ access  private
const updateBlogPost = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.blogId });

  if (req.user._id.toString() === blog.author.toString()) {
    blog.title = req.body.title || blog.title;
    blog.body = req.body.body || blog.body;

    const updatedBlog = await blog.save();
    const { title, body, _id } = updatedBlog;
    res.status(200).json({ updatedBlog });
    //res.status(200).send("hi")
  } else {
    res.status(401);
    throw new Error("You are not authorized to make changes to this post");
  }
});

//@ desc    create new blog post
//@ route   POST api/blogs
//@access   private
const createNewPost = asyncHandler(async (req, res) => {
  const { title, body } = req.body;

  const newBlog = await Blog.create({ title, body, author: req.user._id });
  //const blogs = await Blog.find()
  await newBlog.populate("author");
  // await newBlog.save();
  // await User.findOneAndUpdate(
  //   { _id: req.user._id },
  //   // use $push to push new item to blogs array
  //   { $push: { blogs } },
  //   // set new to true to replace document
  //   { new: true }
  // );
  if (newBlog) {
    console.log(newBlog, "THAT WAS THE NEW BLOG");
    res.status(201).json({ newBlog });
  } else {
    res.status(400);
    throw new Error("can't create new blog");
  }
});

//@ desc    delete blog post
//@ route   DELETE api/blogs/:blogId
//@ access   private
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.blogId });
  console.log(req.user._id);

  if (req.user._id.toString() === blog.author.toString()) {
    // await User.findByIdAndUpdate({_id: req.user._id}, {$pull: {blogs: blog._id }}, {new: true})
    const blogs = await Blog.findOneAndDelete({ _id: blog._id });
    console.log(blogs);
    res.status(200).json({ blogs });
  } else {
    res.status(401);
    throw new Error("You are unable to delete other user's posts");
  }
});

export {
  createNewPost,
  updateBlogPost,
  getAllBlogs,
  getBlogById,
  getPostsByUser,
  deleteBlog,
};
