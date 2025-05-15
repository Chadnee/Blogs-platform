import { Blog } from "./blog.schemaAndModel";
import { TBlog } from "./blogs.interface";

const createBlogIntoDB = async(payload:TBlog) => {
    console.log('pay',payload)
    const result = await Blog.create(payload);
    return result;
};

const getAllBlogsFromDB = async() => {
    const result = await Blog.find();
    return result;
};

const getSingleBlogFromDB = async(_id: string) => {
    const result = await Blog.findById(_id);
    return result

};

const deleteBlogFromDB = async(_id: string) => {
    const result = await Blog.findByIdAndUpdate(
        _id, 
        {isDeleted: true},
        {new: true},
    );
    return result ;
}

const updateBlogIntoDB = async(_id:string, payload: Partial<TBlog>) => {
    const {title, content} = payload
    const result = await Blog.findByIdAndUpdate(
        _id, 
        {title: title, content:content},
        {new: true},
    ) 
    return result
};

export const BlogServices = {
    createBlogIntoDB,
    getAllBlogsFromDB,
    getSingleBlogFromDB,
    deleteBlogFromDB,
    updateBlogIntoDB
}
