import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter }
from "react-syntax-highlighter";

import { tomorrow }
from "react-syntax-highlighter/dist/esm/styles/prism";

function BlogViewer({ selectedPost, setSelectedPost }) {

    if (!selectedPost) return null;

    return (

        <div
            className="blog-modal-overlay"
            onClick={() => setSelectedPost(null)}
        >

            <div
                className="blog-modal"
                onClick={(e) => e.stopPropagation()}
            >

                <img
                    src={selectedPost.imageUrl}
                    alt=""
                    className="blog-banner"
                />

                <div className="blog-body">

                    <h1 className="blog-title">
                        {selectedPost.originalName}
                    </h1>

                    <ReactMarkdown

                        components={{

                            code({
                                inline,
                                className,
                                children,
                                ...props
                            }) {

                                const match =
                                    /language-(\w+)/.exec(className || "");

                                return !inline && match ? (

                                    <SyntaxHighlighter
                                        style={tomorrow}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    >

                                        {String(children).replace(/\n$/, "")}

                                    </SyntaxHighlighter>

                                ) : (

                                    <code className={className} {...props}>
                                        {children}
                                    </code>

                                );
                            }

                        }}

                    >

                        {selectedPost.description}

                    </ReactMarkdown>

                </div>

            </div>

        </div>

    );
}

export default BlogViewer;