import { useState } from "react";

/**
 * Custom hook for managing screen reader announcements
 * Provides a centralized way to announce dynamic content changes
 * 
 * param {string} message - The message to announce
 * 
 * returns {Object} - An object containing:
 * {string} announcement - Current announcement message
 * {Function} announce - Function to set a new announcement
 */

export const useAnnouncement = () => {
  const [announcement, setAnnouncement] = useState('');

  const announce = (message) => {
    setAnnouncement(message);
    // Clear announcement after it's been read to allow re-announcement of same message
    setTimeout(() => setAnnouncement(''), 10000);
  };

  return {
    announcement,
    announce,
  };
};
