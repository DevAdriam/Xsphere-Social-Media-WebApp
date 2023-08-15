import React from "react";

const DropFile = ({ getImg }) => {
    console.log(getImg);
    return (
        <div className="relative mt-5">
            <img
                src={
                    getImg
                        ? getImg
                        : "https://colorlib.com/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                alt="drop file image"
            />
        </div>
    );
};

export default DropFile;
