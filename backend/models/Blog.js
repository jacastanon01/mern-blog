import { Schema, model } from "mongoose";

const blogSchema = Schema(
  {
    title: {
      type: String,
      min: 4,
      required: true,
    },
    body: {
      type: String,
      min: 12,
      required: true,
    },
    // slug: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// blogSchema.pre("save", async function(next){
//     if (!this.isModified("author")){
//         next()
//     }

// })

// blogSchema.pre("/^find/", async function(next){
//     console.log(this.author)
//     next()
//     //this.author = this.populate("author").exec(next)
// })

const Blog = model("Blog", blogSchema);

export default Blog;
