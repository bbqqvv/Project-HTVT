import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Đặt phần tử gốc cho khả năng truy cập

interface ConfirmationModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onConfirm: () => void;
    message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onRequestClose, onConfirm, message }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Xác Nhận"
            className="fixed inset-0 flex items-center justify-center p-4"
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50"
        >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-4">Xác Nhận Hành Động</h2>
                <p className="mb-4">{message}</p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onConfirm}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Xác Nhận
                    </button>
                    <button
                        onClick={onRequestClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
