import { model, Schema } from "mongoose";
import { TBlog } from "./blogs.interface";

const blogSchema = new Schema<TBlog>({
    title:{
        type:String,
        required:[true, "Title of your blog must be required"]
    },
    content:{
        type:String,
        required:[true, "Content of your blog must be required"]
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "Author",
        required:[true, "Author name must be required"]
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, {timestamps: true})

export const Blog = model<TBlog>('Blog', blogSchema);