import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";

function Gallery() {

    const [blogs, setBlogs] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        fetchBlogs();

    }, []);

    const fetchBlogs = async () => {

        try {

            const response =
                await API.get("/blogs");

            setBlogs(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <div className="medium-feed-page">

            <div className="medium-feed-container">

                <div className="medium-profile-header">

                    <h1>
                        Saikumar
                    </h1>

                    <div className="medium-tabs">

                        <span className="active-tab">
                            Home
                        </span>

                        <span>
                            Blogs
                        </span>

                        <span>
                            About
                        </span>

                    </div>

                </div>

                {

                    blogs.map((blog) => (

                        <div
                            key={blog.id}
                            className="medium-post-card"
                            onClick={() =>
                                navigate(
                                    `/blog/${blog.slug}`
                                )
                            }
                        >

                            <div className="medium-post-left">

                                <div className="medium-author">

                                    <div className="medium-avatar">

                                        S

                                    </div>

                                    <span>

                                        Saikumar

                                    </span>

                                    <span className="dot">

                                        •

                                    </span>

                                    <span>

                                        {
                                            new Date(
                                                blog.createdAt
                                            ).toDateString()
                                        }

                                    </span>

                                </div>

                                <h2 className="medium-post-title">

                                    {blog.title}

                                </h2>

                                <p className="medium-post-summary">

                                    {blog.summary}

                                </p>

                            </div>

                            <div className="medium-post-right">

                                <img
                                    src={blog.thumbnail}
                                    alt=""
                                />

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );
}

export default Gallery;