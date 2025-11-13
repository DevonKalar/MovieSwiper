import { useState, useEffect } from "react";

/**
 * Custom hook for managing modal states.
 * 
 * returns {object} - containing the current modalId, and functions to open and close modals.
 */

export const useModal = () => {
  const [modalId, setModalId] = useState(null);

  // Modal logic
  const openModal = (id) => setModalId(id);
  const closeModal = () => setModalId(null);

  useEffect(() => {
    if (!modalId) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modalId]);

  return { 
    modalId, 
    openModal, 
    closeModal 
  };
}

export default useModal;