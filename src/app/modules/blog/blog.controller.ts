import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendRestpnse from "../../utils/sendResponse";
import { BlogServices } from "./blog.service";
import httpStatus from "http-status";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const postABlog = catchAsync(async (req, res, next) => {
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

export const BlogControllers = {
    postABlog,
};
