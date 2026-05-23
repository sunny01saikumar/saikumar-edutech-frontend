import { useEffect, useState } from "react";
import API from "../api/axios";

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

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="blogs-page">

            <h1 className="blogs-title">
                Technical Blogs
            </h1>

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
                                src={blog.image}
                                alt=""
                                className="blog-image"
                            />

                            <div className="blog-content">

                                <h2>
                                    {blog.title}
                                </h2>

                                <p>
                                    {blog.description}
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