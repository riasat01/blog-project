import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { BlogValidations } from "./blog.validation";
import { BlogControllers } from "./blog.controller";

const router = Router();

router.post(
    `/`,
    auth(),
    validateRequest(BlogValidations.blogValidationSchema),
    BlogControllers.postABlog,
);

export const BlogRouter = router;
