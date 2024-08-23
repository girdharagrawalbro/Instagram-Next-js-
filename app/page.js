"use client"
import React, { useEffect } from "react";
import Sidenav from './components/Sidenav';
import Topbar from './components/Topbar';
import StoriesSec from './components/StoriesSec';
import Feed from './components/Feed';
import Profile from './components/Profile';
import ImageUpload from './components/ImageUpload';
import { useRouter } from "next/navigation";

import { useInstaContext } from "./context/InstaContext";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Loggged out Redirecting to login page")
      router.push("/login");
    }
  }, [router]);

  const {
    fetchUserData,
    users,
    fetchStories,
    fetchSuggestions,
  } = useInstaContext();

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUserData();
      console.log(userData._id)
      if (userData && userData._id) {
        await fetchStories({ userId: userData._id });
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount


  return (
    <>
      <Topbar />
      <div className="section d-flex">
        <Sidenav />
        <div className="main p-3">
          <StoriesSec />
          <ImageUpload />
          <Feed />
        </div>
        <Profile />
      </div>
    </>
  );
}
