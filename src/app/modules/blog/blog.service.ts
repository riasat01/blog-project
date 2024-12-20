import { JwtPayload } from "jsonwebtoken";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

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

const updateABlogIntoDB = async (
    id: string,
    payload: Partial<IBlog>,
    user: JwtPayload,
) => {
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            `Couldn't found the blog`,
            `updateABlogIntoDB`,
        );
    }
    if (
        !(
            existingBlog.author.toString() === user.userId ||
            user.role === `admin`
        )
    ) {
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            `Unauthorized access`,
            `updateABlogIntoDB`,
        );
    }
    await Blog.findByIdAndUpdate(id, payload);
    const response = await Blog.findById(id)
        .populate(`author`, `name email`)
        .select(`title content author`);
    // console.log(result);
    return response;
};

export const BlogServices = {
    postABlogIntoDB,
    updateABlogIntoDB,
};
