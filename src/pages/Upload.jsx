import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";

function Upload() {

    const navigate = useNavigate();

    const [file, setFile] =
        useState(null);

    const [description, setDescription] =
        useState("");

    const [preview, setPreview] =
        useState(null);

    /*
        HANDLE FILE
    */

    const handleFile = (e) => {

        const selected =
            e.target.files[0];

        setFile(selected);

        if (selected) {

            setPreview(
                URL.createObjectURL(selected)
            );
        }
    };

    /*
        UPLOAD
    */

    const upload = async () => {

        if (!file) {

            alert("Select Image");

            return;
        }

        try {

            const formData =
                new FormData();

            /*
                IMAGE
            */

            formData.append(
                "file",
                file
            );

            /*
                DESCRIPTION
            */

            formData.append(
                "description",
                description
            );

            await API.post(
                "/images/upload",
                formData
            );

            alert("Upload Success");

            navigate("/feed");

        } catch (error) {

            console.error(error);

            alert("Upload Failed");
        }
    };

    return (

        <div className="content">

            <div className="upload-container">

                <h1 className="upload-title">
                    Upload Image
                </h1>

                <p className="upload-subtitle">
                    Share your post
                </p>

                <div className="upload-box">

                    {

                        preview ? (

                            <img
                                src={preview}
                                alt=""
                                className="preview-image"
                            />

                        ) : (

                            <div className="empty-preview">

                                Image Preview

                            </div>
                        )
                    }

                </div>

                <input
                    type="file"
                    onChange={handleFile}
                    className="file-input"
                />

                <textarea

                    placeholder="Write description..."

                    className="description-input"

                    value={description}

                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }

                />

                <button
                    className="upload-button"
                    onClick={upload}
                >
                    Upload Image
                </button>

            </div>

        </div>
    );
}

export default Upload;