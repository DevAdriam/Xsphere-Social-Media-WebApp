import React from "react";
import { useNavigate } from "react-router-dom";

const PostItem = ({ post }) => {
    console.log(post.image);
    const navigate = useNavigate();
    return (
        <div
            key={post.id}
            className="min-w-[320px] md:w-[450px] h-[420px] md:h-[380px] px-8 py-5 bg-white shadow-xl"
            onClick={() => navigate(`/posts/${post.id}`)}
        >
            {/* image */}
            <div className="w-full h-[150px] overflow-hidden">
                <img src={post.image} alt={post.title} className="object-cover w-full h-full" />
            </div>

            {/* title */}
            <h1 className="text-2xl font-bold py-5">{post.title}</h1>

            {/* desc */}
            <p className="text-md text-md text-slate-400 mb-10">
                {post.description.slice(1, 100) + "..."}
            </p>

            {/* date and username */}
            <div className="flex items-center justify-between">
                <span className="block text-sm font-bold text-stone-900">{post.time}</span>
                <span className="block text-sm font-bold text-stone-900">{post.username}</span>
            </div>
        </div>
    );
};

export default PostItem;
