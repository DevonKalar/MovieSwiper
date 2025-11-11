/**
 * Custom hook to manage popover states.
 * 
 * returns {object} - containing the current popovers state and a function to toggle popovers.
 */

import { useState } from "react";
import { useEffect } from "react";

export const usePopover = () => {
  const [popovers, setPopovers] = useState({});

  useEffect(() => {
    if (Object.keys(popovers).length === 0) return;
    
    const handleClick = (e) => {
      if (e.target.closest('.popover') || e.target.closest('.popover-button')) return;
      setPopovers({});
    };
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        setPopovers({});
      }
    };
    
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [popovers]);

  const togglePopover = (category) => {
    setPopovers(prev => prev[category] ? {} : { [category]: true });
  };

  

  useEffect(() => {
    // Close all popovers on route change
    const handleRouteChange = () => {
      setPopovers({});
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return {
    popovers,
    togglePopover
  };
};

export default usePopover;
