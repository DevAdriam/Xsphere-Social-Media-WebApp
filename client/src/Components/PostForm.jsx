import React, { useState } from "react";
import { useParams } from "react-router-dom";
import fakePosts from "../utils/fakepost";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { FileUploader } from "react-drag-drop-files";
import DropFile from "../Components/DropFile";
const PostForm = ({ titleText, btnText }) => {
    const { id } = useParams();
    const editPost = fakePosts.find((post) => post.id === Number(id));

    const [username, setUsername] = useState(titleText === "Create Post" ? "" : editPost.username);
    const [title, setTitle] = useState(titleText === "Create Post" ? "" : editPost.title);
    const [desc, setDesc] = useState(titleText === "Create Post" ? "" : editPost.description);
    const [img, setImg] = useState(titleText === "Create Post" ? "" : editPost.image);

    console.log({ username, title, desc });

    const handleChange = (files) => {
        const file = files.file;
        console.log(file);
        const reader = new FileReader();

        reader.onload = () => {
            setImg(reader.result);
        };

        reader.readAsDataURL(file);
    };
    return (
        <div className="w-full h-full py-10 ">
            <form className="w-[90%] md:w-[500px] mx-auto px-5 flex items-start md:items-center flex-col gap-5">
                <h1 className="font-bold text-2xl md:text-3xl mb-10">{titleText}</h1>

                <div className="flex gap-4 w-full">
                    <div className="flex flex-col gap-2 flex-start w-[48%]">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            required
                            className="border-2 border-black px-5 py-2 "
                            placeholder="Username"
                        />
                    </div>
                    <div className="flex flex-col gap-2 flex-start w-[48%]">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            required
                            className="border-2 border-black px-5 py-2 "
                            placeholder="Title"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 flex-start w-[100%]">
                    <label>Description</label>
                    {/* <textarea
                        required
                        value={desc}
                        onChange={(e) => {
                            setDesc(e.target.value);
                        }}
                        rows={8}
                        className="border-2 border-black px-5 py-2 "
                        placeholder="Description..."
                    /> */}
                    <ReactQuill
                        theme="snow"
                        value={desc}
                        onChange={setDesc}
                        className="h-44 py-2"
                    />
                </div>

                <FileUploader
                    name="file"
                    types={["JPG", "PNG", "JPEG"]}
                    handleChange={handleChange}
                    children={<DropFile img={img} />}
                />

                <button
                    type="submit"
                    className="border-none mt-10 bg-black hover:bg-black/90 text-white w-full py-3 text-center"
                >
                    {btnText}
                </button>
            </form>
        </div>
    );
};

export default PostForm;
