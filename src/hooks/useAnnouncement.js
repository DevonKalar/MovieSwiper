import { useState } from "react";

/**
 * Custom hook for managing screen reader announcements
 * Provides a centralized way to announce dynamic content changes
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
