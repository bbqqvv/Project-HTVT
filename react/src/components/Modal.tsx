import React, { useState } from 'react';

interface ModalProps {
    onClose: () => void;
    onUpload: (file: File | null) => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, onUpload }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            if (file.type.startsWith('image/')) {
                setSelectedFile(file);
                setError(null);
                onUpload(file); // Gửi tệp đã chọn lên component cha
            } else {
                setError('Vui lòng chọn tệp hình ảnh.');
                setSelectedFile(null);
            }
        } else {
            setSelectedFile(null);
        }
    };

    const handleClose = () => {
        onClose();
        setError(null); // Xóa lỗi khi đóng modal
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3 max-w-lg relative">
                <h2
                    id="modal-title"
                    className="text-xl font-bold mb-4"
                >
                    Tải Minh Chứng
                </h2>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full mb-4 border rounded-lg p-2"
                    aria-describedby="file-error"
                />
                {error && (
                    <p
                        id="file-error"
                        className="text-red-500 text-sm mb-4"
                    >
                        {error}
                    </p>
                )}
                <button
                    className="absolute top-4 right-4 bg-gray-500 text-white rounded-lg py-2 px-4 hover:bg-gray-600 transition duration-300"
                    onClick={handleClose}
                >
                    Đóng
                </button>
            </div>
        </div>
    );
};

export default Modal;
