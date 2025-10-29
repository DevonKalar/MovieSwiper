/**
 * Custom hook to manage popover states.
 * 
 * returns an object containing the current popovers state and a function to toggle popovers.
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
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [popovers]);

  const togglePopover = (category) => {
    setPopovers(prev => prev[category] ? {} : { [category]: true });
  };


  return {
    popovers,
    togglePopover
  };
};

export default usePopover;
