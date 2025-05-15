import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogServices } from "./blog.service";

const creatBlog = catchAsync(async(req, res) => {
    // console.log('r',req.body)
    const result = await BlogServices.createBlogIntoDB(req.body);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Blog has been created successfuly",
        data: result
    })
});

const getAllBlog= catchAsync(async(req, res) => {
    const result = await BlogServices.getAllBlogsFromDB();
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "All blogs are successfuly",
        data: result
    })  
});

const getSingleBlog = catchAsync(async(req, res) => {
    const {blog_id} = req.params;
    const result = await BlogServices.getSingleBlogFromDB(blog_id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Targeted blog is retrieved successfuly",
        data: result
    })
});

const deleteBlog = catchAsync(async(req, res) => {
    const {blog_id} = req.params;
    const result = await BlogServices.deleteBlogFromDB(blog_id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Targeted blog is deleted successfuly",
        data: result
    })
})

const updateBlog = catchAsync(async(req, res) => {
    const {blog_id} = req.params;
    // console.log('r',blog_id,req.body)
    const result = await BlogServices.updateBlogIntoDB(blog_id, req.body);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Targeted blog is updated successfuly",
        data: result
    })
})

export const BlogControllers = {
    creatBlog,
    getAllBlog,
    getSingleBlog,
    deleteBlog,
    updateBlog
}