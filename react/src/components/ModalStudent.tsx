import React from 'react';
import Modal from 'react-modal';
import { CombinedRequestStudent } from './types';  // Điều chỉnh đường dẫn theo cấu trúc dự án của bạn

// Thiết lập thuộc tính root element cho modal
Modal.setAppElement('#root');

interface ModalStudentProps {
    isOpen: boolean;
    onRequestClose: () => void;
    request: CombinedRequestStudent | null;
}

const ModalStudent: React.FC<ModalStudentProps> = ({ isOpen, onRequestClose, request }) => {
    if (!request) return null; // Nếu không có yêu cầu, không render gì

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="fixed inset-0 flex items-center justify-center z-50 px-4 md:px-0"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg w-full max-w-4xl">
                <h2 className="text-sm md:text-lg font-bold mb-4">
                    Thông tin chi tiết yêu cầu của <i className='text-red-600'>{request.student?.student_name || 'N/A'}</i>
                </h2>
                <p><strong>Mã sinh viên:</strong> {request.student_id}</p>
                <p><strong>Loại yêu cầu:</strong> {request.request_type}</p>
                <p><strong>Ngày nộp:</strong> {request.submission_date}</p>
                <p><strong>Ghi chú sinh viên:</strong> {request.student_notes}</p>
                <p><strong>Ghi chú giảng viên:</strong> {request.faculty_notes}</p>
                <p><strong>Trạng thái:</strong> {request.status ? 'Xét duyệt' : 'Từ chối'}</p>

                {/* Thêm các thông tin chi tiết khác tùy theo yêu cầu */}

                <button
                    onClick={onRequestClose}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Đóng
                </button>
            </div>
        </Modal>
    );
};

export default ModalStudent;
