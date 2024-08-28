import Modal from 'react-modal';
import React from 'react';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageUrl, onClose }) => {
  if (!isOpen || !imageUrl) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-lg shadow-lg max-w-screen-sm max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={imageUrl} alt="Selected Evidence" className="w-full h-auto" />
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
