import React from 'react';
import Modal from 'react-modal';

interface ImageModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    selectedImage: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onRequestClose, selectedImage }) => {
    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose} 
            className="modal fixed inset-0 flex justify-center items-center"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="relative bg-white p-4 rounded-lg w-[30%] flex flex-col justify-center items-center">
                <button 
                    onClick={onRequestClose} 
                    className="absolute top-2 right-2 text-xl"
                >
                    ×
                </button>
                {selectedImage && (
                    <img 
                        src={selectedImage} 
                        alt="Evidence" 
                        className="w-full h-full object-contain" 
                    />
                )}
            </div>
        </Modal>
    );
};

export default ImageModal;
