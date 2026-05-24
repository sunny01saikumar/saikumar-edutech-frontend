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

            <div className="feed-container">

                {

                    images.length > 0 ?

                        images.map((img) => (

                            <div
                                key={img.id}
                                className="modern-post-card"
                                onClick={() =>
                                    setSelectedPost(img)
                                }
                            >

                                {/* LEFT */}

                                <div className="modern-post-content">

                                    {/* USER */}

                                    <div className="modern-user-row">

                                        <div className="modern-avatar">

                                            {
                                                img.uploadedBy
                                                    ?.charAt(0)
                                                    ?.toUpperCase()
                                            }

                                        </div>

                                        <div>

                                            <h4>

                                                {img.uploadedBy}

                                            </h4>

                                            <p>

                                                Sai EduTech

                                            </p>

                                        </div>

                                    </div>

                                    {/* TITLE */}

                                    <h2 className="modern-title">

                                        {
                                            img.description
                                                ?.split(" ")
                                                ?.slice(0, 5)
                                                ?.join(" ")
                                        }

                                        ...

                                    </h2>

                                    {/* SMALL DESCRIPTION */}

                                    <p className="modern-description">

                                        {
                                            img.description
                                                ?.split(" ")
                                                ?.slice(0, 35)
                                                ?.join(" ")
                                        }

                                        ...

                                    </p>

                                </div>

                                {/* RIGHT IMAGE */}

                                <div className="modern-image-wrapper">

                                    <img
                                        src={img.imageUrl}
                                        alt=""
                                        className="modern-image"
                                    />

                                </div>

                            </div>

                        ))

                        :

                        <div className="empty-feed">

                            <h1>

                                No Posts Found

                            </h1>

                        </div>

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

                            {/* HEADER */}

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

                                <h1 className="modal-title">

                                    {
                                        selectedPost.description
                                            ?.split(" ")
                                            ?.slice(0, 8)
                                            ?.join(" ")
                                    }

                                    ...

                                </h1>

                                <p className="modal-description">

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