"use client"
import React, { createContext, useState, useContext } from "react";

const InstaContext = createContext();

export const InstaProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [stories, setStories] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts`, {
        method: "GET",
      });
      const json = await response.json();
      setPosts(json);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
          'Authorization': `${token}`
        }
      });
      const userData = await response.json();
      setUsers(userData); // Assuming this sets the users state
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };
  


  const fetchStories = async ({userId}) => {
    console.log(userId)
    try {
      const response = await fetch(`/api/stories/`, {
        method: 'GET',
        headers: {
          'userId': `${userId}`
        }
      });
      const json = await response.json();
      setStories(json);
    }
    catch (error) {
      // throw new Error('Failed to fetch story data');
      console.log(error);
    }
  };
  
  const fetchSuggestions  = async (userId) =>{
    try{
      const response = await fetch(`/api/users/suggested/`, {
        method: 'GET',
        headers: {
          'userId': `${userId}`
        }
      });
      const json = await response.json();
      setSuggested(json);
    }
    catch (error) {
      console.log(error);
    }
  }


  return (
    <InstaContext.Provider
      value={{
        posts,
        fetchPosts,
        fetchUserData,
        fetchStories,
        fetchSuggestions ,
        suggestions,
        stories,
        users,
      }}
    >
      {children}
    </InstaContext.Provider>
  );
};

export const useInstaContext = () => useContext(InstaContext);
