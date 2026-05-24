import { useEffect, useState } from "react";
import API from "../api/axios";
import {
    FaRegBookmark,
    FaArrowRight
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Blogs() {

    const [blogs, setBlogs] =
        useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        fetchBlogs();

    }, []);

    const fetchBlogs = async () => {

        try {

            const response =
                await API.get("/blogs");

            setBlogs(response.data);

        }
        catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="blogs-page">

            <div className="blogs-header">

                <h1>
                    Technical Blogs
                </h1>

                <p>
                    Read Java, Spring Boot,
                    System Design and Backend
                    Engineering articles.
                </p>

            </div>

            <div className="blogs-feed">

                {

                    blogs.map((blog) => (

                        <div
                            key={blog.id}
                            className="blog-card"
                            onClick={() =>
                                navigate(
                                    `/blog/${blog.slug}`
                                )
                            }
                        >

                            <div className="blog-left">

                                <div className="blog-author">

                                    <div className="author-avatar">
                                        S
                                    </div>

                                    <div>

                                        <h4>
                                            {
                                                blog.authorName
                                            }
                                        </h4>

                                        <span>
                                            Sai EduTech
                                        </span>

                                    </div>

                                </div>

                                <h2 className="blog-title">

                                    {blog.title}

                                </h2>

                                <p className="blog-description">

                                    {
                                        blog.summary
                                    }

                                </p>

                                <div className="blog-footer">

                                    <span>

                                        {
                                            new Date(
                                                blog.createdAt
                                            ).toLocaleDateString()
                                        }

                                    </span>

                                    <div className="blog-actions">

                                        <FaRegBookmark />

                                        <FaArrowRight />

                                    </div>

                                </div>

                            </div>

                            <div className="blog-right">

                                <img
                                    src={
                                        blog.thumbnail &&
                                        blog.thumbnail !== ""
                                            ? blog.thumbnail
                                            : "/default-blog.jpg"
                                    }
                                    onError={(e) => {

                                        e.target.src =
                                            "/default-blog.jpg";
                                    }}
                                    alt={blog.title}
                                    className="blog-image"
                                />

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>
    );
}

export default Blogs;