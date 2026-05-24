import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function BlogDetails() {

    const { slug } = useParams();

    const [blog, setBlog] =
        useState(null);

    useEffect(() => {

        fetchBlog();

    }, []);

    const fetchBlog = async () => {

        try {

            const response =
                await API.get(`/blogs/${slug}`);

            setBlog(response.data);

        }
        catch (error) {

            console.log(error);
        }
    };

    if (!blog) {

        return <h1>Loading...</h1>;
    }

    return (

        <div className="blog-details-page">

            <img
                src={blog.thumbnail}
                alt={blog.title}
                className="details-image"
            />

            <h1>
                {blog.title}
            </h1>

            <div
                className="blog-content"
                dangerouslySetInnerHTML={{
                    __html: blog.content
                }}
            />

        </div>
    );
}

export default BlogDetails;