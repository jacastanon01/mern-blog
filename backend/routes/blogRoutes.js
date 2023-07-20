import { Router } from "express"
import {
    createNewPost,
    updateBlogPost,
    getAllBlogs,
    getBlogById,
    getPostsByUser,
    deleteBlog
} from "../controllers/blogController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = Router()

router.use(protect)

router.get("/user/:userSlug", getPostsByUser)
router.route("/")
    .get(getAllBlogs)
    .post(createNewPost)
router.route("/:blogId")
    .get(getBlogById)
    .put(updateBlogPost)
    .delete(deleteBlog)

export default router