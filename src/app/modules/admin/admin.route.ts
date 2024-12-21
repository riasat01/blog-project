import { Router } from "express";
import auth from "../../middlewares/auth";
import { BlogControllers } from "../blog/blog.controller";
import { AuthControllers } from "../auth/auth.controller";

const router = Router();

router.delete(`/blogs/:id`, auth(), BlogControllers.deleteABlog);
router.patch(`/users/:userId/block`, auth(), AuthControllers.blockUser);

export const Adminrouter = router;
