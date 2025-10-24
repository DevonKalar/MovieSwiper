import { CloseIcon } from '@icons';
import { useState } from 'react';

const Modal = ({ children, buttonText, buttonClass, modalClass }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Modal logic
  const toggleModal = () => setIsOpen(!isOpen);

	return (
    <>
      <button
        className={`px-4 py-2 ${buttonClass}`}
        onClick={toggleModal}
      >
        {buttonText}
      </button>
      {isOpen && <div className={`modal-overlay w-full h-full fixed top-0 left-0 flex items-center justify-center z-40 bg-black/50 backdrop-blur-xs fade-in ${isOpen ? 'block' : 'hidden'}`}>
        <div
          className={`modal-content p-8 bg-primary-500 border-2 rounded-2xl shadow-lg relative ${modalClass}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
        >
          {children}
          <button
            className="absolute top-4 right-4 w-fit h-fit p-0 rounded-full bg-secondary-500 text-white z-50"
            onClick={toggleModal}
            type="button"
            aria-label="Close modal"
          >
            <CloseIcon height={32} width={32} />
          </button>
        </div>
    </div>}
    </>	
	);
};

export default Modal;
