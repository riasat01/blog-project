import { JwtPayload } from "jsonwebtoken";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";

const postABlogIntoDB = async (payload: IBlog, user: JwtPayload) => {
    const newBlog: IBlog = {
        title: payload.title,
        content: payload.content,
        author: user.userId,
        isPublished: true,
    };
    const result = await Blog.create(newBlog);
    const response = await Blog.findById(result._id)
        .populate(`author`, `name email`)
        .select(`title content author`);
    return response;
};

export const BlogServices = {
    postABlogIntoDB,
};
