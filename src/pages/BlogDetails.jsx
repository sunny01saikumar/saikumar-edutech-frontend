import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../api/axios";

function BlogDetails() {

    const { slug } = useParams();

    const [blog, setBlog] = useState(null);

    useEffect(() => {

        fetchBlog();

    }, []);

    const fetchBlog = async () => {

        try {

            const response =
                await API.get(
                    `/blogs/${slug}`
                );

            setBlog(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    if (!blog) {

        return <h1>Loading...</h1>;
    }

    return (

        <div className="blog-details-page">

            <div className="blog-details-container">

                <h1 className="blog-title">

                    {blog.title}

                </h1>

                <div className="blog-author-row">

                    <div className="blog-avatar">

                        S

                    </div>

                    <div>

                        <h4>
                            Saikumar
                        </h4>

                        <p>
                            {
                                new Date(
                                    blog.createdAt
                                ).toDateString()
                            }
                        </p>

                    </div>

                </div>

                <img
                    src={blog.thumbnail}
                    alt=""
                    className="blog-thumbnail"
                />

                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{
                        __html: blog.content
                    }}
                />

            </div>

        </div>

    );
}

export default BlogDetails;