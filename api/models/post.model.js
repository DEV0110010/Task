import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
   
    image: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2020/04/03/06/35/work-4997565_1280.png',
    },
    category: {
        type: String,
        default: 'uncategorized'
    },
    slug:{
        type: String,
        required: true,
        unique: true,
    },

   
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;