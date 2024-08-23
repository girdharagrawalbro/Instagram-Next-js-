import React, { useState } from 'react';
import { useInstaContext } from "../context/InstaContext";
import StoryModal from './StoryModal'; // Import the StoryModal component

const StoriesSec = () => {
  const {
    stories,
    users,
  } = useInstaContext();

  const [selectedStory, setSelectedStory] = useState(null); // State to hold the selected story

  const handleStoryClick = (story) => {
    setSelectedStory(story); // Set the clicked story as the selected story
  };

  const closeModal = () => {
    setSelectedStory(null); // Close the modal by setting the selected story to null
  };

  // Separate the user's own story from the followed users' stories
  const userStories = stories.filter(story => story.userId === users._id);
  const followedStories = stories.filter(story => story.userId !== users._id);

  return (
    <div className="add-stories stories">
      <div className="own">
        {userStories.length > 0 ? (
          <div className="stories-box border-danger" onClick={() => handleStoryClick(userStories[0])}>
            <img className="profile-img" src={users.profile_picture} alt="Your Story" />
          </div>
        ) : (
          <div className="stories-box">
            <img className="profile-img" src={users.profile_picture} alt="Your Story" />
            <button>+</button>
          </div>
        )}
        <div className="username">Your Story</div>
      </div>

      <div className="user-stories stories">
        {followedStories.map((story, index) => (
          <div
            key={index}
            className="stories-box stories"
            onClick={() => handleStoryClick(story)} // Handle story click
          >
            <img src={story.media} alt="Story" />
          </div>
        ))}
      </div>

      <div className="stories-suggestion stories" id="suggested-stories">
        {/* Additional suggested stories can go here */}
      </div>

      {/* Render the StoryModal if a story is selected */}
      {selectedStory && <StoryModal story={selectedStory} onClose={closeModal} />}
    </div>
  );
};

export default StoriesSec;
