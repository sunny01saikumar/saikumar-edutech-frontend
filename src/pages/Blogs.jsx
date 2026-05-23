import { useEffect, useState } from "react";
import API from "../api/axios";
import {
    FaRegBookmark,
    FaArrowRight
} from "react-icons/fa";

function Blogs() {

    const [blogs, setBlogs] =
        useState([]);

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

                            <div className="blog-left">

                                <div className="blog-author">

                                    <div className="author-avatar">
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

                                <h2 className="blog-title">

                                    {blog.title}

                                </h2>

                                <p className="blog-description">

                                    {
                                        blog.description
                                    }

                                </p>

                                <div className="blog-footer">

                                    <span>
                                        {
                                            blog.publishedDate
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
                                        blog.image &&
                                        blog.image !== ""
                                            ? blog.image
                                            : "https://placehold.co/600x400?text=Sai+EduTech"
                                    }
                                    alt=""
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