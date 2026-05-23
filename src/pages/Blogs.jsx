import { useEffect, useState } from "react";
import API from "../api/axios";

function Blogs() {

    const [blogs, setBlogs] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchBlogs();

    }, []);

    const fetchBlogs = async () => {

        try {

            const response =
                await API.get("/blogs");

            console.log(response.data);

            setBlogs(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    if (loading) {

        return (

            <div className="blogs-page">

                <h1 className="blogs-title">
                    Loading Blogs...
                </h1>

            </div>
        );
    }

    return (

        <div className="blogs-page">

            <h1 className="blogs-title">
                Technical Blogs
            </h1>

            {

                blogs.length === 0 && (

                    <h2>
                        No Blogs Found
                    </h2>
                )
            }

            <div className="blogs-container">

                {

                    blogs.map((blog, index) => (

                        <div
                            key={index}
                            className="blog-card"
                            onClick={() =>
                                window.open(
                                    blog.link,
                                    "_blank"
                                )
                            }
                        >

                            <img
                                src={
                                    blog.image &&
                                    blog.image.length > 0
                                        ? blog.image
                                        : "https://placehold.co/800x400?text=Sai+EduTech"
                                }
                                alt={blog.title}
                                className="blog-image"
                            />

                            <div className="blog-content">

                                <div className="blog-author">

                                    <div className="blog-avatar">

                                        S

                                    </div>

                                    <div>

                                        <h4>
                                            Saikumar
                                        </h4>

                                        <span>
                                            Sai EduTech
                                        </span>

                                    </div>

                                </div>

                                <h2 className="blog-heading">

                                    {blog.title}

                                </h2>

                                <p className="blog-description">

                                    {
                                        blog.description
                                            ?.substring(0, 180)
                                    }...

                                </p>

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>
    );
}

export default Blogs;