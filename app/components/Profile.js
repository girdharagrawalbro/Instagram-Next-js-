"use client"
import React from "react";
import { useInstaContext } from "../context/InstaContext";
import ProfileLoading from './ProfileLoading';

const Profile = () => {
    const { users, suggestions } = useInstaContext();

    const hasUserData = users && users.fullname && users.username;

    return (
        <div className="profile">
            {hasUserData ? (
                <div className="user-box user-profile d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <div className="user-profile-img">
                            <img src={users.profile_picture} alt="Profile" />
                        </div>
                        <div>
                            <h5 className="mb-0">{users.fullname}</h5>
                            <span className="h6 text-muted mb-0">{users.username}</span>
                        </div>
                    </div>
                    <div>
                        <a href="#" className="text-decoration-none">Switch</a>
                    </div>
                </div>
            ) : (
                <ProfileLoading />
            )}
            
            <div className="suggestion mt-4">
                <div className="head">
                    <h4 className="text-muted">Suggested for you</h4>
                </div>
                <br />
                <div className="suggestion-list" id="suggested-users">
                    {/* Render suggested users here */}
                </div>
            </div>
        </div>
    );
}

export default Profile;
