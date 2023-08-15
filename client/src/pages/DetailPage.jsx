import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import fakePosts from "../utils/fakepost";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Tooltip } from "react-tooltip";
const DetailPage = () => {
    const { id } = useParams();

    const post = fakePosts.find((post) => post.id === Number(id));
    const navigate = useNavigate();
    console.log(post);

    return (
        <div className="w-full px-0 md:px-10 py-5 mx-auto">
            <div className="flex justify-between items-center py-2">
                <header className="flex flex-col gap-2">
                    <h1 className="font-bold text-2xl">{post.title}</h1>
                    <h2 className="text-gray-600 font-semibold">
                        <span>{post.username}</span> | <span>{post.time}</span>
                    </h2>
                </header>

                <buttonGroup className="flex items-end gap-3 md:gap-10">
                    <button
                        data-tooltip-id="edit"
                        data-tooltip-content="Edit"
                        data-tooltip-place="top"
                        onClick={() => navigate(`/post-edit/${post.id}`)}
                    >
                        <BiEdit className="text-blue-500" size={25} />
                        <Tooltip id="edit" />
                    </button>
                    <button
                        data-tooltip-id="delete"
                        data-tooltip-content="Delete"
                        data-tooltip-place="top"
                    >
                        <MdDelete className="text-red-500" size={25} />
                        <Tooltip id="delete" />
                    </button>
                </buttonGroup>
            </div>

            <img src={post.image} alt={post.title} className="object-cover min-w-[200px] w-full" />

            <p className="py-10">{post.description}</p>
        </div>
    );
};

export default DetailPage;
