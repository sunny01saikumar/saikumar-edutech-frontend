import { useEffect, useState } from "react";

import API from "../api/axios";

function Gallery() {

    const [images, setImages] =
        useState([]);

    const [selectedPost, setSelectedPost] =
        useState(null);

    useEffect(() => {

        fetchImages();

    }, []);

    const fetchImages = async () => {

        try {

            const response =
                await API.get("/images");

            setImages(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <div className="feed-page">

            {/* FEED */}

            <div className="feed-container">

                {

                    images.map((img) => (

                        <div
                            key={img.id}
                            className="post-card"
                        >

                            {/* USER */}

                            <div className="post-header">

                                <div className="user-avatar">

                                    {
                                        img.uploadedBy
                                            ?.charAt(0)
                                            ?.toUpperCase()
                                    }

                                </div>

                                <div>

                                    <h3 className="username">

                                        {img.uploadedBy}

                                    </h3>

                                    <p className="post-time">

                                        Sai EduTech

                                    </p>

                                </div>

                            </div>

                            {/* IMAGE */}

                            <div
                                className="post-image-wrapper"
                                onClick={() =>
                                    setSelectedPost(img)
                                }
                            >

                                <img
                                    src={img.imageUrl}
                                    alt=""
                                    className="post-image"
                                />

                            </div>

                            {/* DESCRIPTION */}

                            <div className="post-content">

                                <p className="post-description">

                                    {img.description}

                                </p>

                            </div>

                        </div>

                    ))

                }

            </div>

            {/* MODAL */}

            {

                selectedPost && (

                    <div
                        className="medium-modal-overlay"
                        onClick={() =>
                            setSelectedPost(null)
                        }
                    >

                        <div
                            className="medium-modal"
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >

                            {/* TOP */}

                            <div className="medium-top">

                                <div className="medium-user">

                                    <div className="medium-avatar">

                                        {
                                            selectedPost.uploadedBy
                                                ?.charAt(0)
                                                ?.toUpperCase()
                                        }

                                    </div>

                                    <div>

                                        <h3>

                                            {
                                                selectedPost.uploadedBy
                                            }

                                        </h3>

                                        <p>

                                            Sai EduTech

                                        </p>

                                    </div>

                                </div>

                                <button
                                    className="close-modal"
                                    onClick={() =>
                                        setSelectedPost(null)
                                    }
                                >

                                    ✕

                                </button>

                            </div>

                            {/* IMAGE */}

                            <img
                                src={selectedPost.imageUrl}
                                alt=""
                                className="medium-modal-image"
                            />

                            {/* CONTENT */}

                            <div className="medium-content">

                                <h1>

                                    {
                                        selectedPost.originalName
                                    }

                                </h1>

                                <p>

                                    {
                                        selectedPost.description
                                    }

                                </p>

                            </div>

                        </div>

                    </div>

                )

            }

        </div>

    );
}

export default Gallery;