/**
 *  Usage:
 * 
 *  Within a component:
 *  const { modalId, openModal, closeModal } = useModal();
 *  openModal("myModal");
 *  closeModal();
 */

import { useState } from "react";
import { useEffect } from "react";

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
  }, [modalId, closeModal]);

  return { 
    modalId, 
    openModal, 
    closeModal 
  };
}

export default useModal;