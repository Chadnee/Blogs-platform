import express from 'express';
import { BlogValidation } from './blog.validation';
import validateRequest from '../../middlewares/validateRequest';
import { BlogControllers } from './blog.controller';

const router = express.Router();

    router.post('/create-blogs', 
    validateRequest(BlogValidation.createBlogValidation),
    BlogControllers.creatBlog);
    router.get('/', BlogControllers.getAllBlog);
    router.get('/:blog_id', BlogControllers.getSingleBlog);
    router.delete('/delete/:blog_id', BlogControllers.deleteBlog);
    router.patch('/update/:blog_id', 
        validateRequest(BlogValidation.updateBlogValidation),
        BlogControllers.updateBlog)

export const BlogRoutes = router