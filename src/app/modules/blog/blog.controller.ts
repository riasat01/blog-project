import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendRestpnse from "../../utils/sendResponse";
import { BlogServices } from "./blog.service";
import httpStatus from "http-status";

const postABlog = catchAsync(async (req, res) => {
    const result = await BlogServices.postABlogIntoDB(
        req.body,
        req.user as JwtPayload,
    );
    sendRestpnse(res, {
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
    sendRestpnse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: `Blog created successfully`,
        data: result,
    });
});

export const BlogControllers = {
    postABlog,
    updateABlog,
};
