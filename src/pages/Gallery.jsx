import { useEffect, useState } from "react";
import API from "../api/axios";

function Gallery() {

    const [images, setImages] = useState([]);

    const [selectedImage, setSelectedImage] =
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

            {/* FEED HEADER */}

            <div className="feed-header">

                <h1 className="feed-title">
                    Sai EduTech Feed
                </h1>

                <p className="feed-subtitle">
                    Learn • Share • Explore
                </p>

            </div>

            {/* POSTS */}

            <div className="feed-container">

                {

                    images.length > 0 ?

                        images.map((img) => (

                            <div
                                key={img.id}
                                className="post-card"
                            >

                                {/* TOP USER INFO */}

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
                                        setSelectedImage(
                                            img.imageUrl
                                        )
                                    }
                                >

                                    <img
                                        src={img.imageUrl}
                                        alt={img.originalName}
                                        className="post-image"
                                    />

                                </div>

                                {/* CONTENT */}

                                <div className="post-content">

                                    <p className="post-description">

                                        {img.description}

                                    </p>

                                </div>

                            </div>

                        ))

                        :

                        <div className="empty-feed">

                            <h2>
                                No Posts Yet
                            </h2>

                        </div>

                }

            </div>

            {/* IMAGE MODAL */}

            {

                selectedImage && (

                    <div
                        className="image-modal"
                        onClick={() =>
                            setSelectedImage(null)
                        }
                    >

                        <img
                            src={selectedImage}
                            alt=""
                            className="modal-image"
                        />

                    </div>

                )

            }

        </div>

    );
}

export default Gallery;