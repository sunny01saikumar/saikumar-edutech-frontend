import { useEffect, useState } from "react";
import API from "../api/axios";

function Gallery() {

    const [images, setImages] =
        useState([]);

    useEffect(() => {

        fetchImages();

    }, []);

    const fetchImages = async () => {

        try {

            const response =
                await API.get("/images");

            setImages(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="content">

            <div className="gallery-container">

                <div className="gallery-grid">

                    {

                        images.map((img)=>(

                            <div
                                key={img.id}
                                className="gallery-card"
                            >

                                <img
                                    src={`https://saikumar-edutech-backend-1.onrender.com/${img.filePath}`}
                                    alt={img.description}
                                    className="gallery-image"
                                />

                                <div
                                    className="gallery-content"
                                >

                                    <p>

                                        {img.description}

                                    </p>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

}

export default Gallery;