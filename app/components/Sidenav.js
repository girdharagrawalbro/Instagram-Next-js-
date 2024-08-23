import React from 'react'
import Link from 'next/link'
const Sidenav = () => {
    return (
        <div className="sidenav d-flex flex-column gap-3">
            <Link href="/">
                < img src="svg/home.svg" alt="" />
                <span className="span">Home</span>
            </Link >
            <Link href="/">
                <img src="svg/search.svg" alt="" />
                <span className="span">Search</span>
            </Link>
            <Link href="/">
                <img src="svg/explore.svg" alt="" />
                <span className="span">Explore</span>
            </Link>
            <Link href="/">
                <img src="svg/reels.svg" alt="" />
                <span className="span">Reels</span>
            </Link>
            <Link href="/">
                <img src="svg/message.svg" alt="" />
                <span className="span">Message</span>
            </Link>
            <Link href="/">
                <img src="svg/notification.svg" alt="" />
                <span className="span">Notifications</span>
            </Link>
            <Link href="/">
                <img src="svg/create.svg" alt="" />
                <span className="span">Create</span>
            </Link>
            <Link href="/">
                <img src="img/<?php echo $user_data['profile_picture_url'] ?>" alt="Profile" />
                <span className="span">Profile</span>
            </Link>
            <Link href="/">
                <img src="svg/hamburger.svg" alt="" />
                <span className="span">More</span>
            </Link>

        </div>

    )
}

export default Sidenav