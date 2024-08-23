"use client"
import React, { useEffect } from "react";
import { useInstaContext } from "../context/InstaContext";
import PostLoading from './PostLoading';
const Feed = () => {
    const {
        posts,
        users,
        fetchPosts,
    } = useInstaContext();

    useEffect(() => {
        fetchPosts();
    }, []);
    return (
        <div className="feed px-5 py-1">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <>
                        <div className="box border shadow d-flex flex-column p-2 gap-2 rounded my-0 mx-auto" key={post._id}>
                            <div className="user-box d-flex justify-content-between align-items-center p-1">
                                <div>
                                    <div className="profile-img">
                                        <img src={users.profile_picture} alt="profile" />
                                    </div>
                                    <div className="username">
                                        <h6>username</h6>
                                        <h6>Its me </h6>
                                    </div>
                                </div>
                                <div>
                                    <img src="svg/dots.svg" alt="Options" />
                                </div>
                            </div>
                            <div className="img" data-post-id="<?php echo $post['post_id'] ?>">

                                <img alt="Post Image" className="post-image" src={'img/' + post.image_url} />


                                {/* <video autoplay muted loop className="post-image">
                        <source src="img/" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video> */}
                            </div>
                            <div className="btns d-flex justify-content-between">
                                <div className="post d-flex gap-2" data-post-id="<?php echo $post['post_id'] ?>">
                                    <img className="like" src="svg/like.svg" alt="Like Button" />
                                    <img src="svg/comment.svg" alt="Comment" />
                                    <img src="svg/share.svg" filerule="showPage('share')" alt="Share" />
                                </div>
                                <div className="post" data-post-id="<?php echo $post['post_id'] ?>">
                                    <img className="save save-btn" src="svg/save.svg" alt="Save" />
                                </div>
                            </div>
                            <div className="likes">

                                <span></span>
                            </div>
                            <div className="caption">
                                <h6>Caption: <span>{post.caption}</span>
                                </h6>
                            </div>
                            <div className="comments">
                                View all comments
                            </div>
                            <div className="uploaded">
                                <span className="text-muted">

                                    {new Date(post.created_at).toDateString()}
                                </span>
                            </div>
                        </div>
                    </>
                ))) :
                <PostLoading />
            }
        </div>
    )
}

export default Feed