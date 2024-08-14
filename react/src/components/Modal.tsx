import React, { useState } from 'react';

interface ModalProps {
    onClose: () => void;
    onUpload: (files: File[] | null) => void;
    maxFiles?: number; // Giới hạn số lượng tệp có thể tải lên, mặc định là 2
}

const Modal: React.FC<ModalProps> = ({ onClose, onUpload, maxFiles = 2 }) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? Array.from(event.target.files) : [];
        if (files.length > maxFiles) {
            setError(`Bạn chỉ có thể chọn tối đa ${maxFiles} tệp.`);
            return;
        }

        const validFiles = files.filter(file => file.type.startsWith('image/'));
        if (validFiles.length !== files.length) {
            setError('Vui lòng chỉ chọn các tệp hình ảnh.');
            return;
        }

        setSelectedFiles(validFiles);
        setError(null);
    };

    const handleUpload = () => {
        onUpload(selectedFiles);
        handleClose(); // Đóng modal sau khi tải lên
    };

    const handleClose = () => {
        onClose();
        setError(null); // Xóa lỗi khi đóng modal
        setSelectedFiles([]); // Xóa danh sách tệp đã chọn khi đóng modal
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
                    multiple
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
                {selectedFiles.length > 0 && (
                    <ul className="mb-4">
                        {selectedFiles.map((file, index) => (
                            <li key={index} className="text-sm text-gray-700">
                                {file.name}
                            </li>
                        ))}
                    </ul>
                )}
                <div className="flex justify-end space-x-2">
                    <button
                        className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-300"
                        onClick={handleUpload}
                        disabled={selectedFiles.length === 0}
                    >
                        Tải lên
                    </button>
                    <button
                        className="bg-gray-500 text-white rounded-lg py-2 px-4 hover:bg-gray-600 transition duration-300"
                        onClick={handleClose}
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
