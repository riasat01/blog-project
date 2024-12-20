import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { BlogValidations } from "./blog.validation";
import { BlogControllers } from "./blog.controller";

const router = Router();

router.post(
    `/`,
    auth(),
    validateRequest(BlogValidations.blogPostValidationSchema),
    BlogControllers.postABlog,
);

router.patch(
    `/:id`,
    auth(),
    validateRequest(BlogValidations.blogUpdateValidationSchema),
    BlogControllers.updateABlog,
);

router.delete(`/:id`, auth(), BlogControllers.deleteABlog);

router.get(`/`, BlogControllers.getAllBlogs);

export const BlogRouter = router;
