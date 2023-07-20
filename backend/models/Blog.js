import { Schema, model } from "mongoose";
import { slugify } from "../utils/slugify.js";

const blogSchema = Schema({
    title: {
        type: String,
        min: 4,
        required: true
    },
    body: {
        type: String,
        min: 12,
        required: true
    },
    // slug: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: true})

const Blog = model("Blog", blogSchema)

// blogSchema.pre("save", async function(next){
//     this.slug = await slugify(this.title)
//     next()
// })


export default Blog



