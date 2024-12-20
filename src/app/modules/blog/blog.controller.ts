import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogServices } from "./blog.service";
import httpStatus from "http-status";

const postABlog = catchAsync(async (req, res) => {
    const result = await BlogServices.postABlogIntoDB(
        req.body,
        req.user as JwtPayload,
    );
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: `Blog created successfully`,
        data: result,
    });
});

const updateABlog = catchAsync(async (req, res) => {
    const result = await BlogServices.updateABlogIntoDB(
        req.params.id,
        req.body,
        req.user as JwtPayload,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Blog updated successfully`,
        data: result,
    });
});

const deleteABlog = catchAsync(async (req, res) => {
    const result = await BlogServices.deleteABlogIntoDB(
        req.params.id,
        req.user as JwtPayload,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Blog deleted successfully`,
        data: result,
    });
});

const getAllBlogs = catchAsync(async (req, res) => {
    const result = await BlogServices.getAllBlogsFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: `Blogs fetched successfully`,
        success: true,
        data: result,
    });
});

export const BlogControllers = {
    postABlog,
    updateABlog,
    deleteABlog,
    getAllBlogs,
};
