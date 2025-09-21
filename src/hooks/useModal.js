import { useState } from "react";

export const useModal = () => {
  const [modalId, setModalId] = useState(null);

  // Modal logic
  const openModal = (id) => setModalId(id);
  const closeModal = () => setModalId(null);

  return { modalId, openModal, closeModal };
}

export default useModal;