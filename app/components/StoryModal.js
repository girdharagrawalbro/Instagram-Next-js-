import React from 'react';

const StoryModal = ({ story, onClose }) => {
  if (!story) return null;

  return (
    <div className="story-modal">
      <div className="overlay" onClick={onClose}></div>
      <div className="modal-content">
        <img src={"img/"+ story.media} alt="Story" />
      </div>
        <button className="close-btn" onClick={onClose}>×</button>
    </div>
  );
};

export default StoryModal;
