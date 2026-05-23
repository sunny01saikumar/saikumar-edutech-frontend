import { useEffect, useState } from "react";
import API from "../api/axios";

function Gallery() {

    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {

        try {

            const response = await API.get("/images");

            console.log(response.data);

            setImages(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <div className="content">

            <div className="gallery-container">

                <div className="gallery-header">

                    <div>

                        <h1 className="gallery-title">
                            Gallery
                        </h1>

                        <p className="gallery-subtitle">
                            Explore uploaded images
                        </p>

                    </div>

                </div>

                <div className="gallery-grid">

                    {
                        images.length > 0 ?

                        images.map((img) => (

                            <div
                                key={img.id}
                                className="gallery-card"
                            >

                                <img
                                    src={img.imageUrl}
                                    alt={img.originalName}
                                    className="gallery-image"
                                />

                                <div className="gallery-content">

                                    <h4>
                                        Uploaded By: {img.uploadedBy}
                                    </h4>

                                    <p className="gallery-description">
                                        {img.description}
                                    </p>

                                </div>

                            </div>

                        ))

                        :

                        <h3>No Images Found</h3>
                    }

                </div>

            </div>

        </div>
    );
}

export default Gallery;